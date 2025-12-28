-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create service_categories table
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_urdu TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  description_urdu TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_urdu TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  description_urdu TEXT NOT NULL,
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  department TEXT,
  requirements JSONB NOT NULL DEFAULT '[]',
  fees JSONB NOT NULL DEFAULT '{}',
  processing_time TEXT,
  urgency_options JSONB,
  how_to_apply TEXT,
  how_to_apply_urdu TEXT,
  online_portal_url TEXT,
  is_online_available BOOLEAN DEFAULT false,
  tracking_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create offices table
CREATE TABLE offices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  department TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  timings JSONB,
  services_offered UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create government_schemes table
CREATE TABLE government_schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_urdu TEXT NOT NULL,
  description TEXT NOT NULL,
  description_urdu TEXT NOT NULL,
  eligibility_criteria JSONB,
  benefits TEXT,
  benefits_urdu TEXT,
  how_to_apply TEXT,
  how_to_apply_urdu TEXT,
  deadline DATE,
  category TEXT,
  department TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  question_urdu TEXT NOT NULL,
  answer TEXT NOT NULL,
  answer_urdu TEXT NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_reminders table
CREATE TABLE user_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  service_name TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  reminder_type TEXT,
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_offices_city ON offices(city);
CREATE INDEX idx_offices_type ON offices(type);
CREATE INDEX idx_offices_location ON offices(latitude, longitude);
CREATE INDEX idx_faqs_service ON faqs(service_id);
CREATE INDEX idx_schemes_active ON government_schemes(is_active);
CREATE INDEX idx_reminders_date ON user_reminders(reminder_date);

-- Enable Row Level Security (RLS)
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for service_categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for offices" ON offices FOR SELECT USING (true);
CREATE POLICY "Public read access for government_schemes" ON government_schemes FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for faqs" ON faqs FOR SELECT USING (true);

-- User reminders policies (users can only access their own reminders)
CREATE POLICY "Users can read own reminders" ON user_reminders FOR SELECT USING (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Users can insert own reminders" ON user_reminders FOR INSERT WITH CHECK (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Users can update own reminders" ON user_reminders FOR UPDATE USING (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Users can delete own reminders" ON user_reminders FOR DELETE USING (user_id IS NULL OR user_id = auth.uid());
