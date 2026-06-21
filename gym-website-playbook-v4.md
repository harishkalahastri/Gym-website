# Gym Website — Antigravity Build Playbook (v4)

## What changed in this version
- **Build tool fully renamed from Kimi to Antigravity** throughout (title, Stage 0 heading, Stage 1 troubleshooting notes) — reflects the actual tool in use
- **Stage 0 rewritten** to document the real sourcing pipeline used: photo source/permission check → AI reframe to desktop 16:9 (with restraint-focused VEO3 animation guidance, including explicit static-zone lockdowns for lights/mirrors) → Mux hosting via direct stream URL, not the player/embed page
- **Stage 1 finalized**: locked headline ("Transform Your Physique. Elevate Your Mindset."), real Mux HLS stream URL wired in, badges upgraded from generic float to full scroll-triggered orbit animation, restructured as an Antigravity-style technical prompt (vs. Kimi's conversational style)
- **Stage 5's old "Hero badges — micro-animation" entry removed** — superseded by the orbit animation now fully specified in Stage 1, avoids having two conflicting animation specs for the same badges

## Style decision: palette
Keeping **black / charcoal / electric orange** as the brand identity — distinctive against the lime-green-on-black look that's becoming common in this aesthetic lane. Reversible at Stage 1 if you'd rather match the reference's green more closely — that's what the hero stage is for, lock it before moving on.

## Final section structure
1. Navbar
2. Hero (video/animated bg, contrast typography, floating badges, trust badges + stat counter)
3. Proof / Results (before-after cards, metrics)
4. Why Us (bullet list + photo pairing)
5. Programs (horizontal card row)
6. Training / Class Gallery (2x3 grayscale photo grid — doubles as facilities)
7. Pricing (3 tiers, differentiated)
8. Trial Form (consent line included)
9. Trainers (base grid, then hover-reveal layer)
10. Reviews / Success Stories (photo + testimonial pairing — placeholder-labeled until real ones exist)
11. FAQ
12. Final CTA (bold full-bleed accent banner)
13. Footer

**Growth-tier add-ons (modal, not a section):** BMI Calculator + Fitness Goal Quiz — see Stage 4.5. Triggered from hero/navbar, not part of the linear scroll.

**Backend automation:** lead capture (database) + WhatsApp confirmation for all three lead-gen points (Trial Form, BMI Calculator, Fitness Quiz) — see Stage 4.7. Buildable now that Antigravity handles backend, not just frontend.

---

## Stage 0 — Source and animate the hero asset (before opening Antigravity)

For the cold demo, avoid generic stock gym footage. If using your own photo (confirm you own it or have written permission — see note below), the actual pipeline:

1. **Source/select a photo** — your own gym photo, or a Pinterest mood reference for sourcing a license-clean replacement (Unsplash/Pexels), or a reference image you have explicit written permission to use. Don't animate a screenshot of someone else's finished site design — composed layouts (badges, headline, branding baked in) aren't yours to use even if the photo itself is licensed; get the clean source photo, not the screenshot.
2. **Reframe to desktop 16:9** via an AI image tool (ChatGPT image generation, Nano Banana, or similar). Prompt it to extend the background outward to fill the wider frame while keeping the subject's pose, lighting, and proportions unchanged — and to strip any existing text/logos/UI from the source so the output is a clean canvas (icons, headline, and badges get built separately in Antigravity, not baked into the image).
3. **Animate with VEO3** (or Seedance). Keep motion extremely restrained — full reps or camera movement reads as cheap "AI video"; a held pose with one small living detail (breath, a faint tremble, a single blink) reads as a premium brand cinemagraph. Explicitly lock down any bright linear lights or reflective surfaces (light strips, mirrors) as static zones in the prompt — these are the most common things video models animate unprompted, and they're usually the most attention-grabbing element in the frame after the subject. Always specify: no camera movement, no zoom/pan, seamless loop (first and last frame must match exactly).
4. **Review the output yourself before hosting it** — check the loop seam and any glow/light elements first, since those are the most likely failure points and harder to judge in motion than in a still frame.
5. **Host on Mux** (or similar) and grab the **direct stream URL**, not the player/embed page. Mux's player page (`player.mux.com/...`) and iframe embed snippets won't work as a CSS background video — they come with their own UI chrome and can't be layered under floating elements reliably. Get the Playback ID from your asset and build the direct stream URL: `https://stream.mux.com/{PLAYBACK_ID}.m3u8`. Confirm the asset's playback policy is set to **public**, not signed — a private/signed asset will fail to load at that URL.

Swap for the real gym's footage once you're reskinning live for an actual owner.

---

## Stage 1 — Hero (finalized)

**Locked decisions from build:** headline copy, video source, and badge animation style are now final — this replaces the earlier placeholder/generic version.

```
Build a single-page responsive website hero section using HTML, CSS, and 
vanilla JavaScript (or React if that's your default — keep it to one clean 
component, no unnecessary complexity).

Section: Hero
- Full-bleed background video, black background as fallback. Video source: 
  https://stream.mux.com/9azaiObJDEWkWs018P6rLe00cSaFV00ITW00MaOirP2TJc4.m3u8 
  — this is an HLS stream, use hls.js to support it in standard browsers. 
  Autoplay, muted, looping, object-fit: cover, no overlay, 100% opacity.
- Import "Bebas Neue" and "Instrument Serif" from Google Fonts.
- Headline: "Transform Your Physique. Elevate Your Mindset." — two lines, in 
  Bebas Neue, except the word "Elevate" which should render in italic 
  Instrument Serif as a contrasting accent word. Position bottom-left, 
  ~90-100px from the edge on desktop.
- Below the headline, a short subheadline in a clean sans-serif body font.

Floating icon badges:
- Four circular badges positioned around the subject in the video: clock 
  icon (label "Hours", value "1.5"), running-figure icon (label "Poses", 
  value "20"), flame icon (label "Kcal", value "550"), dumbbell icon (label 
  "Sets", value "5"). Dark charcoal badge background, electric orange icon, 
  soft glow border. Generate simple modern line-icon SVGs for each — don't 
  use external icon libraries with bulky bundles, keep them lightweight 
  inline SVGs, and don't copy icon artwork from any reference image.
- Scroll-triggered orbit animation: bind badge position to scroll progress 
  through the hero section (use Intersection Observer or a scroll-progress 
  calculation, not a CSS-only animation). As the user scrolls through the 
  first 100vh of the hero, animate all four badges together along a 
  synchronized circular orbit path around the subject — same direction, same 
  speed, evenly spaced so they maintain their relative positions to each 
  other throughout (like four points on a rotating ring). Keep the orbit 
  radius close to each badge's starting position so they never cross over 
  the subject's face or the headline text. Once the hero section scrolls out 
  of view, badges should settle into a fixed resting position rather than 
  continuing to orbit.

Trust badge row: ⭐ 4.9 Rating, 🏋️ 1000+ Members, 👨‍🏫 15 Certified Trainers, 
📍 Open 6AM-11PM. Animate the member count as a count-up counter on page 
load (e.g. 0 to 1000+ over ~1.5 seconds).

CTAs: "Book Free Trial" (solid electric orange button), "WhatsApp" (outline 
button), "Call Now" (text link).

Navbar: sticky, pill-shaped, transparent over the hero, transitions to solid 
black with a blur backdrop-filter once the user scrolls past the hero.

Fallback handling: set a static poster image (a still frame from the video, 
or the pre-animation source photo) as the video element's poster attribute, 
so something always renders even before the video loads. If the video fails 
to load or play (network error, unsupported format, blocked autoplay), fall 
back to displaying that poster image as a static background rather than 
showing a black screen — the badges, headline, and CTAs must remain fully 
visible and functional in either case.

Make it fully responsive — test and screenshot both desktop and mobile 
breakpoints once built, and verify the scroll-orbit animation doesn't break 
or cause badges to overlap text at any scroll position before considering 
this done. Respect prefers-reduced-motion: if a visitor's system has reduced 
motion enabled, replace the scroll-orbit animation with a simple fade-in for 
the badges (no orbiting motion) and keep the background video static on its 
first frame instead of autoplaying.
```

**If the video fails to load:** the most likely cause is the Mux asset's playback policy being private/signed rather than public — check that setting before troubleshooting anything else. Also verify the poster-image fallback actually displays in this case — don't just fix the video and skip testing the failure path.

**If the orbit animation comes out janky or badges overlap text at certain scroll points:** don't keep re-explaining the concept in text — screenshot or screen-record the exact broken behavior and describe precisely what's wrong (e.g. "badge 2 overlaps the headline at 50% scroll"). Antigravity can self-verify with screenshots/recordings, so use that rather than guessing blind.

---

## Stage 2 — Mobile pass

```
Make sure the whole site is fully responsive. On mobile: hamburger menu in the 
navbar, headline scales down without losing impact, buttons stack vertically, 
background video still covers full height without distortion, trust badges 
wrap cleanly instead of overflowing.
```

---

## Stage 3 — Lock the design system

```
From this point on, use the exact same fonts, colors (black/charcoal 
background, electric orange accent, grayscale photography throughout — no full 
color images anywhere on the site), spacing rhythm, and animation style 
(fade-up on scroll, soft glow on hover) for every new section I ask you to 
build. Don't reinvent the style each time — match what we've already built in 
the hero.
```

### Brand voice
Disciplined, direct, "tough-love coach" energy — not corporate wellness-speak. Short sentences, second person, outcome-first. Avoid clichés ("journey," "transform your life"). Headlines: confident, a little intense. Supporting copy (forms, FAQ, confirmations): warm and plain.

### Typography scale

| Level | Desktop | Mobile | Font |
|---|---|---|---|
| H1 (hero only) | 64-96px | 36-44px | Bebas Neue |
| H2 (section headers) | 40-48px | 28-32px | Bebas Neue |
| H3 (card titles) | 24-28px | 20-22px | Bebas Neue / semibold sans |
| H4 (sub-labels) | 18-20px | 16-18px | Semibold sans |
| Body | 16-18px | 15-16px | Inter / General Sans, 1.6 line-height |
| Caption (consent lines, footer) | 13-14px | 12-13px | Regular sans, muted color |

Accent word (Instrument Serif, italic): match the size of the headline it sits in. One word per headline, max — don't overuse.

### Spacing / radius reference
- Section vertical padding: 96-120px desktop, 56-64px mobile
- Card radius: 16-20px
- Card padding: 32px desktop, 20px mobile
- Button radius: full pill for primary CTAs, 12px for secondary

### Curated Pinterest search terms (use these, not a generic 50)
- dark fitness website hero
- gym website black orange
- fitness landing page bold typography
- luxury gym interior photography
- boutique fitness branding
- athletic brand grayscale photography
- gym membership pricing UI
- fitness app dashboard dark mode
- glassmorphism UI dark
- gym trainer profile card design
- before after transformation UI design
- scroll animation portfolio website

---

## Stage 4 — Build remaining sections, one at a time

**Proof / Results** *(previously missing — build before animating it)*
```
Build a "Real Members. Real Transformations." section, same style as 
established. Before/after photo cards in grayscale, each with a short stat 
("Lost 25kg", "Gained 10kg muscle"). Include one larger video testimonial card 
alongside the photo cards.
```

**Why Us** *(bullet+photo layout, not generic icon cards)*
```
Build a "Why Choose Us" section, same style as established. Left side: a large 
grayscale action photo. Right side: a short headline plus a bullet list of 6 
short feature lines (Nutrition Guidance, Expert Trainers, Progress Tracking, 
Premium Membership, Community Support, Flexible Timings), each with a small 
icon. No big icon cards — keep it as one clean combined block.
```

**Programs** *(horizontal card row)*
```
Build a "Discover What Sets Us Apart" programs section, same style as 
established. Horizontal row of cards: Strength Training, Weight Loss, Boxing, 
Yoga, CrossFit, HIIT Workouts. Each card: a grayscale photo, program name, and 
a small "Explore" tag in the accent color. One card highlighted/active by 
default with an orange border.
```

**Training / Class Gallery** *(replaces generic facility grid)*
```
Build a "Train Smarter. Unleash Your Potential." section, same style as 
established. A 2x3 grid of grayscale class/equipment photos (Cardio Zone, 
Strength Area, CrossFit Zone, Boxing Area, Recovery Area, Locker Rooms), each 
with a short label underneath, hover zoom on each image.
```

**Pricing**
```
Build a membership pricing section, same style as established. Three cards: 
Basic, Pro (marked "Most Popular"), Elite. Each card lists 4-5 features. Pro 
and Elite should each say "Everything in [previous tier], plus..." so the 
upgrade value is obvious at a glance. Cards lift and glow softly on hover.
```

**Trial Form**
```
Build the free trial booking form section directly after pricing. Fields: 
Name, WhatsApp Number, Fitness Goal (dropdown), Preferred Time. Label the 
phone field "WhatsApp Number" specifically, not generic "Phone" — this field 
maps directly to the backend's whatsapp_number column and must be a number 
the visitor actually has WhatsApp on, since that's the only channel used for 
confirmation. Submit button: "Book My Free Trial." Directly below the 
button, in small text: "By submitting, you agree to receive WhatsApp updates 
about your trial booking." On submit, show a success animation with the 
message: "You're booked — we'll text you a reminder on WhatsApp."
```

**Trainers — base grid** *(previously missing — build before the hover layer)*
```
Build a "Your Fitness Goals, Their Expertise" trainer section, same style as 
established. Grid of trainer cards: grayscale photo, name, specialization, 
years of experience, small Instagram icon link, "Book Session" CTA.
```

**Reviews / Success Stories** *(previously missing)*
```
Build a "Your Success Stories, Our Inspiration" section, same style as 
established. Large grayscale photo on one side, testimonial text and member 
name on the other, plus 2-3 smaller supporting photo cards. 

IMPORTANT: use clearly placeholder/sample content for now (e.g. label as 
"Sample member story") — do not write polished fake quotes as if they're real 
until we have actual member testimonials from a real client.
```

**FAQ**
```
Build an FAQ accordion section, same style as the rest of the site. Smooth 
expand/collapse, only one item open at a time. Questions: "Do you offer free 
trials?", "Are trainers certified?", "What are gym timings?", "Is personal 
training available?", "Do you provide diet plans?"
```

**Final CTA + Footer** *(bold full-bleed banner)*
```
Build a full-bleed final CTA banner in solid electric orange (not dark this 
time — full color block for maximum contrast against the rest of the page). 
Bold headline, then Book Free Trial / WhatsApp / Call Now buttons in black. 
Below it, a footer with location, embedded Google Maps, phone, email, 
Instagram, Facebook, working hours, and a small Privacy Policy / Terms link.
```

---

## Stage 4.5 — Growth-tier features: BMI Calculator + Fitness Goal Quiz

**Positioning decision:** both ship as a **separate modal/popup**, triggered from the hero CTA row or navbar — not a new full-width section between Pricing and Trial Form, and not folded into the Trial Form. Reasoning: stacking a second contact-info ask directly next to the trial form competes for the same conversion moment and adds friction right where the form needs to stay simple. A standalone modal gives these tools their own entry point, catches visitors who aren't ready to book a trial yet but will engage with a quick personalized tool, and captures that lead earlier in the visit instead of only at the bottom of the page.

**Lead capture model:** both tools ask for name + WhatsApp number *before* revealing results (not after) — consistent with the lead-gen approach used everywhere else on the site (trial form, WhatsApp CTA). This is the same contact-then-reveal pattern, applied to a lower-commitment entry point.

Both tools have a dedicated buildable backend now — see `gym-website-backend-playbook-v2.md` for the data model and endpoints. (The earlier framing of this as a future-retainer-only feature is superseded; capture and notification are in v1 scope today.)

**Value contract (important — frontend display text and backend API values must match exactly):** the option labels shown to the user and the values sent to the API are not the same thing. Use this exact mapping so the frontend and backend stay in sync regardless of which Antigravity session builds which side:

| Question | Displayed option | API value sent |
|---|---|---|
| Goal | Lose Weight | `weight_loss` |
| Goal | Build Muscle | `build_muscle` |
| Goal | General Fitness | `general_fitness` |
| Goal | Sport-Specific Training | `sport_specific` |
| Frequency | 1-2 | `1-2` |
| Frequency | 3-4 | `3-4` |
| Frequency | 5+ | `5+` |
| Experience | Beginner | `beginner` |
| Experience | Some Experience | `some_experience` |
| Experience | Advanced | `advanced` |

### BMI Calculator — Antigravity prompt
```
Build a "Know Your Number" BMI calculator as a modal popup, triggered by a 
"Check Your BMI" button in the hero CTA row and a matching link in the navbar. 
Same visual style as the rest of the site (black/charcoal background, electric 
orange accent, Bebas Neue headline).

Step 1 (lead capture): before showing the calculator inputs, ask for Name and 
WhatsApp Number. Short line under the fields: "We'll send your result and a 
free next-step tip on WhatsApp." Continue button: "Get My BMI."

Step 2 (calculator): after submitting Step 1, reveal Height (cm, slider or 
input — send as height_cm) and Weight (kg, input — send as weight_kg) to 
match the backend's field names exactly. Calculate button: "Calculate My 
BMI." Note: the displayed BMI result should come from the backend's response 
after submission, not be calculated client-side — the backend recalculates 
and is the source of truth (see backend playbook Stage B.2).

Step 3 (result): show the BMI number in large Bebas Neue type, with a colored 
indicator bar (underweight / healthy / overweight / obese ranges, electric 
orange marker showing where they land). Below it, one short, plain-language 
line of context — no medical claims, no diagnosis language, just a category 
label and a soft next step: "Your trainer can build a plan around this 
number." End with two CTAs: "Book Free Trial" (solid orange) and "Talk to a 
Trainer on WhatsApp" (outline).

Close button (X) top-right at every step. Smooth fade/scale transition between 
steps, same animation language as the rest of the site.
```

### Fitness Goal Quiz — Antigravity prompt
```
Build a "Find Your Plan" fitness goal quiz as a modal popup, triggered by a 
"Take the Quiz" button in the hero CTA row and a matching link in the navbar. 
Same visual style as the rest of the site.

Step 1 (lead capture): ask for Name and WhatsApp Number first. Short line: 
"We'll match you to a program and follow up on WhatsApp." Continue button: 
"Start Quiz."

Steps 2-4 (3 short questions, one per screen, progress dots at top):
1. "What's your main goal?" — Lose Weight / Build Muscle / General Fitness / 
   Sport-Specific Training
2. "How many days a week can you train?" — 1-2 / 3-4 / 5+
3. "Any past training experience?" — Beginner / Some Experience / Advanced

Each question is single-select, large tap-friendly buttons, auto-advances to 
the next question on selection (no separate "next" click needed).

Step 5 (result): show a matched program name pulled from the existing Programs 
section (Strength Training, Weight Loss, Boxing, Yoga, CrossFit, HIIT) based 
on their answers, with a one-line reason ("Because you want to lose weight and 
can train 3-4 days a week, we'd start you on..."). End with two CTAs: "Book 
Free Trial" (solid orange) and "WhatsApp a Trainer" (outline).

Close button (X) top-right at every step. Same fade/scale transition style as 
the rest of the site. Progress dots fill in orange as the user advances.
```

---

## Stage 4.7 — Lead capture automation

**Full backend architecture, data model, all three endpoints, dual notifications (lead + owner), and the Groq chatbot now live in a dedicated companion document: `gym-website-backend-playbook-v2.md`.** Build that alongside this frontend playbook — Stage 4 (Trial Form) and Stage 4.5 (BMI Calculator + Fitness Quiz) need to exist before the backend stages can be wired up against them.

**Quick summary of what it covers:** Supabase for data storage, Meta WhatsApp Business API for messaging (lead confirmation + owner alert), Resend for owner email alerts, and a Groq-powered chatbot scoped strictly to site content (see note below). All external integrations are stubbed by default until real API keys are supplied, so the backend is fully buildable and testable before any credentials exist.

**Scope change flagged:** the AI chatbot was originally excluded from this playbook's premortem as generic filler — that call has been deliberately overridden; see the backend playbook for the full reasoning and the constraints used to keep it from becoming exactly the kind of unscoped gimmick the original exclusion was avoiding.

---

## Stage 5 — Layer in interactivity

**Trainer cards — hover reveal**
```
I'm uploading two images of the same trainer — one standard photo, one in a 
different pose. Build a trainer card where the first image shows by default, 
and on hover it smoothly transitions to reveal the second image.
```

**Results cards — scroll-triggered reveal**
```
Add a scroll-triggered fade/slide-in animation to the proof section cards — 
each animates in as it enters the viewport, staggered slightly.
```

**Programs cards — hover state**
```
Add a hover state to the program cards: on hover, the card lifts slightly, 
the photo zooms in subtly, and the border glows in the accent color.
```

---

## Stage 6 — Inject Dribbble/design references

Screenshot specific references and upload directly:

```
Build [section] using a similar layout and element positioning to this 
reference image — it doesn't need to be the same content, just use it as a 
structural reference. Apply our existing design system (fonts, colors, 
animation style) on top of it.
```

---

## Stage 7 — Ship and pitch

- Deploy and get the live, shareable link (Antigravity can deploy directly per its own prompts — confirm hosting/deploy target before this step)
- Screen-record a scroll-through before the pitch — movement sells, screenshots don't
- Live reskin in the room: swap name/colors/photos in real time
- Optional inbound channel: post the scroll-through publicly, tool-tagged, targeting gym-owner/fitness audiences

---

## Updated premortem — risks from this direction

1. **Over-copying the Dribbble reference.** It's a known public portfolio shot. Use it for style/UX devices, not a 1:1 clone — different copy, different proportions, recombined into our structure.
2. **Unlicensed brand logos.** Don't carry over the Nike/Adidas/Puma row — implies sponsorship that doesn't exist. Legal and trust risk, not just a style choice.
3. **Drifting off-brand without deciding.** Lock the palette choice (orange vs. the reference's lime green) deliberately at Stage 1 — don't let it drift by default.
4. **Convincing-looking fake testimonials.** The photo+quote pairing is emotionally effective — which makes placeholder content presented as real more damaging if discovered, both to the pitch and to the gym's actual future members. Label placeholders clearly until real ones exist.
5. **Two lead-gen modals diluting the primary CTA.** With Trial Form, BMI Calculator, and Fitness Quiz all capturing name + WhatsApp number, make sure follow-up messaging downstream distinguishes "trial booked" leads from "quiz/BMI" leads — they're at different points in the funnel and a blanket "you're booked!" message to a quiz lead who never booked a trial will misfire.

## Premortem round 2 — frontend/backend integration risks (fixed in this version)

6. **Hero video had no failure fallback.** If Mux goes down, the playback policy gets flipped to private by accident, or HLS isn't supported, the hero rendered a black screen with floating text over nothing — the single most visible part of the site. Fixed: Stage 1 now specifies a poster-image fallback and explicit failure-state behavior.
7. **Orbit animation had no reduced-motion or low-end-device consideration.** Scroll-linked JS can stutter badly on older phones, and ignoring `prefers-reduced-motion` is both an accessibility gap and a risk of the "wow" effect looking broken on the exact kind of device a gym owner might view the live link on. Fixed: Stage 1 now specifies a reduced-motion fallback.
8. **Quiz/BMI option labels and backend API values were never explicitly mapped.** "Lose Weight" (frontend display) vs. `weight_loss` (backend matching logic) were specified independently in two different prompts with no shared contract — exactly the kind of mismatch that silently breaks matching logic when two separate Antigravity sessions build each side. Fixed: Stage 4.5 now includes an explicit value-mapping table.
9. **"Phone" (Trial Form) vs. "WhatsApp Number" (BMI/Quiz modals) — same field, two names, unclear if same value.** If a visitor's general phone number differs from their WhatsApp number, message delivery silently fails. Fixed: Trial Form field renamed to "WhatsApp Number" explicitly, with a note on why.
10. **Stage 4.5 still framed automation as a future Growth-tier/retainer feature**, but the backend playbook delivers it in v1 today — stale text that misrepresented current scope. Fixed: updated to point at the backend playbook directly.

## What NOT to include
- Unlicensed third-party brand logos
- Testimonials/reviews presented as real before they are
- Membership calculator (redundant with clear pricing cards)
- Achievement wall, live occupancy indicator (real infra dependency, not a website feature)
- Progress tracker demo (this is a member portal/login product, not a website)
- Corporate membership page (don't build speculative pages for a hypothetical use case)
- Multi-page sitemap (About/Blog/Contact as separate pages) — this is a focused single-page demo by design
- SEO strategy, meta titles, schema — needs a real gym's name/city/domain to be anything but generic; build once a real client signs

*(AI chatbot was previously excluded here — that call has been overridden; see Stage 4.7 and the backend playbook for the scoped version now in plan.)*

---

## Master checklist (pre-pitch)

- [ ] Hero locked — headline, video, badges, trust counter
- [ ] Mobile pass done
- [ ] Design system locked (fonts, colors, spacing, brand voice)
- [ ] All 13 core sections built and reviewed
- [ ] BMI Calculator modal built and tested (Growth tier)
- [ ] Fitness Goal Quiz modal built and tested (Growth tier)
- [ ] Lead capture automation built — all 3 sources save to Supabase, with source-specific WhatsApp confirmation to the lead AND email + WhatsApp alert to the owner (see backend playbook Stage C)
- [ ] Groq chatbot built and scoped — answers site-content questions only, redirects off-topic questions, "Book Free Trial" CTA visible in chat panel
- [ ] Backend testing checklist complete (see backend playbook Stage F) — all endpoints, validation, and notification logging verified before the pitch
- [ ] Interactivity layered (hover-reveal, scroll-reveal)
- [ ] Trial form has consent line + success state
- [ ] Reviews section clearly placeholder-labeled (no fake-real quotes)
- [ ] No unlicensed brand logos anywhere
- [ ] Live link works on mobile + desktop
- [ ] Scroll-through screen recording captured for pitch use
