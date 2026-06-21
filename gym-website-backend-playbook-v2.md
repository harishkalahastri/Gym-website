# Gym Website — Backend Playbook (v2)

Companion document to `gym-website-playbook-v4.md` (frontend). This covers everything needed to make the site **fully functional**, not a frontend mockup: data storage, the three lead-capture endpoints, dual notifications (lead + owner), and a new Groq-powered chatbot.

Read this alongside the frontend playbook — it assumes Stage 4 (Trial Form) and Stage 4.5 (BMI Calculator + Fitness Quiz) are already built or being built in the same Antigravity project, since this backend exists to capture what those forms produce. Stage 1 (Hero) has no backend dependency and can be built independently of this document.

## Premortem fixes applied in this version
A full premortem pass was run against v1 of this document and the frontend playbook together. Five backend-specific issues were found and fixed here:
1. **RLS policy was described in prose, not as actual logic** — risked Antigravity either locking out the frontend entirely or leaving tables wide open. Stage A now specifies the exact policy per table and per role.
2. **Chatbot risked leaking GROQ_API_KEY to the browser** — Stage E originally didn't specify the Groq call had to be server-side, which directly contradicted this document's own testing checklist. Now explicitly requires a server-side proxy endpoint.
3. **No duplicate-submission protection** — a double-click or network retry could create duplicate leads and fire duplicate WhatsApp messages to both lead and owner, visibly broken in a live pitch. Stage B now includes a shared idempotency rule across all three endpoints.
4. **BMI category boundaries were ambiguous at the edges** (e.g. exactly 25.0) — now specified with precise inequality logic so no value double-buckets.
5. **Incorrectly listed Stage 1 (Hero) as a dependency** — it isn't; corrected to only Stage 4 and 4.5.

Three additional issues were found in the **frontend** playbook during this same pass (hero video had no failure fallback, orbit animation had no reduced-motion fallback, quiz/BMI field names and option values weren't explicitly contracted between frontend and backend) — see that document's "Premortem round 2" section for details; those fixes are already applied there.

## Note on scope: this is a demo backend, not production-hardened
This site exists to get a gym owner to say yes in a pitch — it needs to **actually work** when tested live (a real form submission produces a real WhatsApp message and a real email, in front of them), but it doesn't need enterprise-scale auth, rate-limiting, or multi-tenant architecture yet. Build for "true and reliable," not "scales to 10,000 gyms." Revisit hardening once a real client signs.

## Logged scope change from the frontend playbook
The frontend playbook's premortem explicitly excluded an AI chatbot as "agency-demo filler that a plain FAQ accordion does better." That call is **overridden here, deliberately** — a Groq-powered chatbot is now in scope (see Stage B.5). The FAQ accordion stays too; the chatbot supplements it, doesn't replace it. Flagging this so the two documents don't quietly disagree with each other.

---

## Stack decisions (locked)

| Layer | Choice | Why |
|---|---|---|
| Database + API | **Supabase** (Postgres) | Instant REST API on top of Postgres, generous free tier, built-in auth if an admin panel gets added later, fastest path to "actually working" without standing up a separate server |
| WhatsApp messaging | **Meta WhatsApp Business API** (official) | More setup than Twilio, but official and scalable — matches the "real client will eventually use this" framing rather than a throwaway demo integration |
| Email | **Resend** | Simpler API and lighter setup than SendGrid; verified-domain sending without a heavy account-approval process |
| AI chatbot | **Groq API** (fast inference, e.g. Llama 3.1/3.3 models) | Scoped to site content only — see Stage B.5 constraints |

**Current credential status:** Meta WhatsApp Business API access isn't set up yet — build with a stub function now (logs the exact payload instead of sending), structured so a real API key drops in later without restructuring any logic. Same applies if Resend/Groq keys aren't ready yet at build time — stub identically.

---

## Stage A — Data model (Supabase)

Build this first — every other stage writes to or reads from these tables.

```
Set up a Supabase project (or connect to an existing one) and create the 
following schema:

Table: leads
- id (uuid, primary key, default gen_random_uuid())
- created_at (timestamptz, default now())
- name (text, not null)
- whatsapp_number (text, not null)
- source (text, not null — one of 'trial_form', 'bmi_calculator', 'fitness_quiz')
- status (text, default 'new' — for future use: 'new', 'contacted', 'converted')

Table: trial_bookings
- id (uuid, primary key, default gen_random_uuid())
- lead_id (uuid, foreign key references leads(id))
- fitness_goal (text)
- preferred_time (text)

Table: bmi_submissions
- id (uuid, primary key, default gen_random_uuid())
- lead_id (uuid, foreign key references leads(id))
- height_cm (numeric)
- weight_kg (numeric)
- bmi_value (numeric)
- bmi_category (text — e.g. 'underweight', 'healthy', 'overweight', 'obese')

Table: quiz_submissions
- id (uuid, primary key, default gen_random_uuid())
- lead_id (uuid, foreign key references leads(id))
- goal_answer (text)
- frequency_answer (text)
- experience_answer (text)
- matched_program (text)

Table: notification_log
- id (uuid, primary key, default gen_random_uuid())
- lead_id (uuid, foreign key references leads(id))
- channel (text — 'whatsapp_lead', 'whatsapp_owner', 'email_owner')
- status (text — 'sent', 'failed', 'stubbed')
- error_message (text, nullable)
- created_at (timestamptz, default now())

Enable Row Level Security on all five tables. Do not leave any table without 
an explicit policy — RLS enabled with zero policies blocks all access 
including from the API, and RLS disabled leaves tables fully open to anyone 
with the anon key. Use this exact policy structure:

- leads, trial_bookings, bmi_submissions, quiz_submissions: 
  * Allow INSERT for the `anon` role with no restrictions on the insert 
    itself (the API endpoint layer handles validation before the insert 
    happens, not the database policy).
  * Do NOT allow SELECT, UPDATE, or DELETE for the `anon` role on any of 
    these four tables — there is no frontend read access in this version.
  * Allow ALL operations (SELECT, INSERT, UPDATE, DELETE) for the 
    `service_role` key only — this is what the server-side notification 
    logic uses, and service_role bypasses RLS by default in Supabase, so 
    confirm server-side code uses the service_role key, not the anon key, 
    for any read operation.
- notification_log: 
  * No `anon` access at all — INSERT, SELECT, UPDATE, DELETE all denied for 
    `anon`. This table is written and read exclusively by server-side code 
    using the service_role key.

After setting these policies, explicitly test that an anonymous/frontend 
client CAN insert a new lead but CANNOT read back any existing leads table 
contents — verify both halves, not just that inserts work.
```

**Why a separate `notification_log` table:** when something goes wrong with a WhatsApp send three weeks from now, you want to be able to query "which leads didn't get notified" without digging through server logs. This is cheap to add now and painful to retrofit later.

---

## Stage B — Lead capture endpoints

One endpoint per source, each doing the same three things: validate → save to DB → trigger both notification paths (Stage C). Building them separately (not one generic endpoint) because each source has different required fields and a different owner-notification message.

**Duplicate-submission protection (applies to all three endpoints below):** a double-click on the submit button or a network retry must not create two leads and fire two full sets of notifications — duplicate WhatsApp messages to both the lead and the owner is a visible, unprofessional failure mode, especially live in a pitch. Apply this rule to B.1, B.2, and B.3 identically:

```
On the frontend, disable the submit button immediately on click (before the 
API response returns) to prevent a literal double-click from firing two 
requests.

On the backend, additionally guard against retries/race conditions: before 
inserting a new lead, check whether a lead with the same whatsapp_number and 
same source was created in the last 60 seconds. If one exists, treat this as 
a duplicate — return the same success response the original request would 
have gotten (so the frontend still shows its normal success state), but do 
NOT insert a second row and do NOT fire notifications again.
```

### B.1 — Trial Form endpoint

```
Build a server-side API endpoint (e.g. POST /api/leads/trial-form) that:

1. Accepts: name, whatsapp_number, fitness_goal, preferred_time
2. Validates: name and whatsapp_number are required and non-empty; 
   whatsapp_number matches a basic phone format check
3. Inserts a row into `leads` (source = 'trial_form'), then a linked row 
   into `trial_bookings` with the fitness_goal and preferred_time
4. On success, triggers both notification paths (see Stage C) with 
   source = 'trial_form'
5. Returns a success response the frontend can use to show the existing 
   "You're booked — we'll text you a reminder on WhatsApp" success state
6. On validation failure, returns a clear error the frontend can display 
   inline on the form (don't let the form silently fail)
```

### B.2 — BMI Calculator endpoint

```
Build a server-side API endpoint (e.g. POST /api/leads/bmi-calculator) that:

1. Accepts: name, whatsapp_number, height_cm, weight_kg
2. Validates: same as trial-form, plus height_cm and weight_kg must be 
   positive numbers within a sane human range (height 100-250cm, weight 
   30-300kg) — reject and return an error otherwise
3. Calculates BMI server-side (weight_kg / (height_cm/100)^2) — do not trust 
   a BMI value if the frontend sends one, recalculate it
4. Categorizes the result using these exact, non-overlapping boundaries — 
   underweight: BMI < 18.5; healthy: 18.5 <= BMI < 25; overweight: 
   25 <= BMI < 30; obese: BMI >= 30. Use strict/inclusive comparisons exactly 
   as written so no value falls into two categories or none (e.g. a BMI of 
   exactly 25.0 must be "overweight," not "healthy")
5. Inserts into `leads` (source = 'bmi_calculator') and `bmi_submissions`
6. Triggers both notification paths with source = 'bmi_calculator'
7. Returns the BMI value and category for the frontend's Step 3 result 
   display
```

### B.3 — Fitness Goal Quiz endpoint

```
Build a server-side API endpoint (e.g. POST /api/leads/fitness-quiz) that:

1. Accepts: name, whatsapp_number, goal_answer, frequency_answer, 
   experience_answer
2. Validates: same base checks as the other two endpoints
3. Determines matched_program server-side using simple rule logic based on 
   the three answers (e.g. goal=weight_loss + frequency=3-4 days → "Weight 
   Loss" program; goal=build_muscle + experience=advanced → "Strength 
   Training"; etc. — define a small decision table covering the six 
   programs from the Programs section: Strength Training, Weight Loss, 
   Boxing, Yoga, CrossFit, HIIT)
4. Inserts into `leads` (source = 'fitness_quiz') and `quiz_submissions`
5. Triggers both notification paths with source = 'fitness_quiz'
6. Returns the matched program name and a one-line reason for the 
   frontend's Step 5 result display
```

---

## Stage C — Dual notifications: lead confirmation + owner alert

Two completely separate notification paths fire on every successful submission. Don't conflate them — the lead-facing message and the owner-facing message have different audiences, different tones, and different required information.

### C.1 — Lead-facing WhatsApp confirmation
*(This is what was already specced in the frontend playbook's Stage 4.7 — included here for completeness, unchanged.)*

```
Send a WhatsApp message to the lead's whatsapp_number via the Meta WhatsApp 
Business API, with content that depends on source:

- trial_form: confirm the booking, mention their preferred_time, note a 
  trainer will follow up. Never use the word "booked" for the other two 
  sources below.
- bmi_calculator: confirm their BMI result was received, offer the free 
  trial as a next step. Do not say "booked."
- fitness_quiz: confirm their matched program, offer the free trial as a 
  next step. Do not say "booked."

If WHATSAPP_API_KEY is not set in environment variables, stub this: log the 
exact message payload to console instead of calling the real API, and 
record the notification_log entry with status = 'stubbed' rather than 
'sent'. Structure the function so swapping in a real key requires no other 
code changes.
```

### C.2 — Owner-facing alerts (WhatsApp + email)

This is the new piece — the gym owner needs to know a lead came in, with enough operational detail to actually follow up, not a customer-facing confirmation tone.

```
Immediately after a successful lead capture (any of the three sources), 
fire two owner-facing notifications in parallel — don't block one on the 
other, and don't let a failure in one prevent the other from sending:

1. WhatsApp to OWNER_WHATSAPP_NUMBER (an environment variable, not 
   hardcoded) via the Meta WhatsApp Business API. Message content varies by 
   source and includes operational details, e.g.:
   - trial_form: "New trial booking: [name], [whatsapp_number]. Goal: 
     [fitness_goal]. Preferred time: [preferred_time]."
   - bmi_calculator: "New BMI lead: [name], [whatsapp_number]. BMI: 
     [bmi_value] ([bmi_category])."
   - fitness_quiz: "New quiz lead: [name], [whatsapp_number]. Matched 
     program: [matched_program]."
   If WHATSAPP_API_KEY isn't set, stub identically to C.1 (log payload, 
   record as 'stubbed').

2. Email to OWNER_EMAIL (environment variable) via Resend, with the same 
   operational details as the WhatsApp message but formatted as a clean 
   email (subject line: "New lead: [name] via [source]"). Include all 
   captured fields for that source in the email body. If RESEND_API_KEY 
   isn't set, stub identically (log the email payload instead of sending, 
   record as 'stubbed').

Record both attempts in notification_log regardless of outcome — a failed 
or stubbed notification should never prevent the lead from being saved, and 
should never throw an error back to the frontend (the lead's experience of 
submitting the form should be unaffected by whether the owner's notification 
succeeded).
```

**Why parallel, not sequential:** if the WhatsApp call hangs or is slow, you don't want the email also delayed waiting on it — and vice versa. Independent failure domains.

---

## Stage D — Environment variables

```
Set up the following environment variables (use Antigravity's env/secrets 
management, don't hardcode any of these in source files):

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   (server-side only, never exposed to frontend)
WHATSAPP_API_KEY            (leave unset for now — stub mode)
WHATSAPP_PHONE_NUMBER_ID    (Meta's sender ID, leave unset for now)
OWNER_WHATSAPP_NUMBER       (the gym owner's number to receive alerts)
RESEND_API_KEY
OWNER_EMAIL                 (the gym owner's email to receive alerts)
GROQ_API_KEY
```

Confirm `.env` (or equivalent) is in `.gitignore` before any commit — these are real credentials once filled in, even in demo mode.

---

## Stage E — Groq-powered chatbot

**Scope note:** this overrides the frontend playbook's earlier exclusion (see top of this document). Keeping it tightly scoped rather than open-ended, since an unscoped chatbot is exactly the kind of generic filler the original exclusion was reacting to.

**Critical architecture requirement:** the Groq API key must never be called directly from frontend/browser JavaScript — that exposes the key to anyone who opens dev tools. Build a server-side endpoint (e.g. POST /api/chat) that the frontend widget calls; that endpoint holds the GROQ_API_KEY and makes the actual Groq API call server-side, then returns just the response text to the frontend. The frontend never sees the key.

```
Build a server-side API endpoint (e.g. POST /api/chat) that accepts the 
visitor's message and a short conversation history, calls the Groq API 
server-side using GROQ_API_KEY (never exposed to the frontend), and returns 
the assistant's reply text.

Then build a chat widget (floating button bottom-right, opens a small chat 
panel, same visual style as the rest of the site — dark background, electric 
orange accents, Bebas Neue for the widget header) that calls this endpoint, 
not the Groq API directly.

Constraints — this must be a scoped assistant, not an open-ended chatbot:
- System prompt restricts the assistant to answering only questions about 
  this gym: programs offered, pricing tiers, trainers, class schedule, 
  membership policies, the FAQ content already on the site, and how to book 
  a free trial.
- If asked something unrelated (general knowledge, other topics, anything 
  not about this gym), the assistant should politely redirect: "I can help 
  with questions about our programs, pricing, trainers, or booking a trial 
  — what would you like to know?"
- Feed the assistant's system prompt with the actual site content (program 
  names and descriptions, pricing tier details, FAQ Q&As, gym hours) so 
  answers are grounded in what's actually on the page, not invented.
- Keep responses short — 2-4 sentences max, matching the site's direct 
  brand voice (see Stage 3 brand voice in the frontend playbook: 
  disciplined, direct, plain language, no fluff).
- Include a persistent CTA within the chat: after any answer, a small "Book 
  Free Trial" button stays visible in the chat panel.
- If the visitor asks something that sounds like a real booking intent 
  (e.g. "I want to join" / "how do I book a trial"), the assistant should 
  point them to the Trial Form section rather than trying to complete the 
  booking inside the chat itself — the chat answers questions, it doesn't 
  replace the form.

Use GROQ_API_KEY from environment variables. If not set, stub with a fixed 
fallback response so the widget UI is still demoable without a live key.
```

**Why this scoping matters for the pitch specifically:** an unscoped chatbot that can be asked anything is a liability in a live demo — if a gym owner or anyone in the room asks it something off-topic or tries to break it, an ungrounded chatbot can produce an answer that looks unprofessional or just wrong. Restricting it to site content, with a defined redirect for anything else, is what keeps this looking like a polished feature instead of a parlor trick that backfires.

---

## Stage F — Testing before the pitch

Don't trust this is working just because Antigravity says it built it without errors — verify end to end, since this is exactly the kind of thing that needs to work live in front of a gym owner:

- [ ] Submit the Trial Form with real test data — confirm a row appears in `leads` and `trial_bookings` in Supabase
- [ ] Submit the BMI Calculator — confirm the BMI is calculated server-side correctly (test with a known height/weight you can verify by hand) and the row lands in `bmi_submissions`
- [ ] Submit the Fitness Quiz — confirm the matched_program logic returns sensible results across a few different answer combinations, not just the happy path
- [ ] Check `notification_log` after each test submission — confirm all three notification attempts (lead WhatsApp, owner WhatsApp, owner email) are logged, even in stub mode
- [ ] Intentionally submit invalid data (empty name, malformed phone number, out-of-range height/weight) — confirm validation errors are returned cleanly, not a server crash
- [ ] Once real WhatsApp/Resend/Groq keys are wired in, re-test all of the above with real sends before the actual pitch — don't find out a key is misconfigured in front of the gym owner
- [ ] Test the chatbot with 2-3 on-topic questions and 1-2 deliberately off-topic questions — confirm the redirect behavior works
- [ ] Confirm no API keys are visible in browser dev tools / frontend network requests (service role key, Groq key, WhatsApp key should only ever be used server-side) — specifically check the Network tab while using the chatbot widget to confirm it calls your own /api/chat endpoint, not Groq's API directly
- [ ] Submit the same form twice in quick succession (double-click test) — confirm only one lead row and one set of notifications result, not two
- [ ] Using the Supabase dashboard with the anon/public key (not service role), attempt to read the `leads` table directly — confirm this is blocked by RLS; then confirm a normal form submission can still insert successfully

---

## What this backend playbook deliberately does NOT include (v1)
- Admin dashboard / lead management UI — leads land in Supabase directly, viewable via Supabase's own table editor for now; a proper dashboard is a clear Growth-tier upsell, not needed for the demo
- User authentication / accounts — no login system, this is a lead-capture site, not a member portal
- Payment processing — no membership checkout flow; pricing cards link to the trial form, not a payment gateway
- Retry/backoff logic for failed notifications — logged as 'failed' in `notification_log` for now; automatic retries are a real reliability feature worth adding once this is live for an actual client, not before
- Rate limiting / spam protection on the public endpoints — fine for a demo and early real usage, but flag this explicitly as a pre-launch task before a real gym goes live with real traffic
