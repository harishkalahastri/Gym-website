-- 1. Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    source TEXT NOT NULL, -- 'trial_form', 'mini_lead_form', 'bmi_calculator', 'fitness_quiz'
    status TEXT DEFAULT 'new' -- 'new', 'contacted', 'converted'
);

-- 2. Create trial_bookings table
CREATE TABLE IF NOT EXISTS trial_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    fitness_goal TEXT,
    preferred_time TEXT
);

-- 3. Create bmi_submissions table
CREATE TABLE IF NOT EXISTS bmi_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    height_cm NUMERIC NOT NULL,
    weight_kg NUMERIC NOT NULL,
    bmi_value NUMERIC NOT NULL,
    bmi_category TEXT NOT NULL -- 'underweight', 'healthy', 'overweight', 'obese'
);

-- 4. Create quiz_submissions table
CREATE TABLE IF NOT EXISTS quiz_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    goal_answer TEXT NOT NULL,
    frequency_answer TEXT NOT NULL,
    experience_answer TEXT NOT NULL,
    matched_program TEXT NOT NULL
);

-- 5. Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    member_name TEXT NOT NULL,
    plan TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT current_date,
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'expired', 'suspended'
    renewal_date DATE,
    reminder_status TEXT NOT NULL DEFAULT 'none' -- 'none', 'sent', 'failed'
);

-- 6. Create notification_log table
CREATE TABLE IF NOT EXISTS notification_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    channel TEXT NOT NULL, -- 'whatsapp_lead', 'whatsapp_owner', 'email_owner'
    status TEXT NOT NULL, -- 'sent', 'failed', 'stubbed'
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bmi_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors
DROP POLICY IF EXISTS "Allow anonymous inserts for leads" ON leads;
DROP POLICY IF EXISTS "Allow service_role full access for leads" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts for trial_bookings" ON trial_bookings;
DROP POLICY IF EXISTS "Allow service_role full access for trial_bookings" ON trial_bookings;
DROP POLICY IF EXISTS "Allow anonymous inserts for bmi_submissions" ON bmi_submissions;
DROP POLICY IF EXISTS "Allow service_role full access for bmi_submissions" ON bmi_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts for quiz_submissions" ON quiz_submissions;
DROP POLICY IF EXISTS "Allow service_role full access for quiz_submissions" ON quiz_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow service_role full access for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow service_role full access for notification_log" ON notification_log;

-- RLS Policies definition
-- Leads
CREATE POLICY "Allow anonymous inserts for leads" ON leads
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service_role full access for leads" ON leads
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Trial Bookings
CREATE POLICY "Allow anonymous inserts for trial_bookings" ON trial_bookings
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service_role full access for trial_bookings" ON trial_bookings
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- BMI Submissions
CREATE POLICY "Allow anonymous inserts for bmi_submissions" ON bmi_submissions
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service_role full access for bmi_submissions" ON bmi_submissions
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Quiz Submissions
CREATE POLICY "Allow anonymous inserts for quiz_submissions" ON quiz_submissions
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service_role full access for quiz_submissions" ON quiz_submissions
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Memberships
CREATE POLICY "Allow anonymous inserts for memberships" ON memberships
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service_role full access for memberships" ON memberships
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Notification Log (Anon access fully blocked, service_role allowed only)
CREATE POLICY "Allow service_role full access for notification_log" ON notification_log
    USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
