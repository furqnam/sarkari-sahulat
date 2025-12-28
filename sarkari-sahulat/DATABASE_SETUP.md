# Database Setup Guide

This guide will help you set up the Supabase database for SarkariSahulat with the complete schema and seed data we've prepared.

## 1. Create a Supabase Project

1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **"New project"**.
3. Choose your organization and provide a name (e.g., `sarkari-sahulat`).
4. Set a strong database password.
5. Select a region closest to your users (e.g., *Singapore* or *Mumbai* for Pakistan).
6. Click **"Create new project"**.

## 2. Apply Database Schema

Once your project is ready (it takes a minute):

1. Go to the **SQL Editor** tab in the left sidebar.
2. Click **"New query"**.
3. Open the file `supabase/migrations/001_initial_schema.sql` from your project folder.
4. Copy the entire content of the file.
5. Paste it into the SQL Editor in Supabase.
6. Click **"Run"** in the bottom right.

*You should see "Success. No rows returned."*

## 3. Seed Initial Data

Now populate the database with the 100+ services, offices, and schemes we created:

1. Go to the **SQL Editor** again.
2. Click **"New query"**.
3. Open the file `supabase/seed.sql` (this is the consolidated file we just created).
4. Copy the entire content.
5. Paste it into the Supabase SQL Editor.
6. Click **"Run"**.

*This might take a few seconds as it inserts all the data.*

## 4. Connect Your App

1. Go to **Project Settings** (gear icon) -> **API**.
2. Copy the **Project URL** and **anon public key**.
3. Open your local `.env.local` file.
4. Paste the values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## 5. Verify Setup

To check if everything worked:

1. Go to the **Table Editor** icon in Supabase.
2. You should see 6 tables:
   - `services` (~20 rows)
   - `service_categories` (10 rows)
   - `offices` (~20 rows)
   - `government_schemes` (~10 rows)
   - `faqs` (~18 rows)
   - `user_reminders` (0 rows)

## Troubleshooting

- **"Relation already exists" error**: You ran the schema script twice. Ignore or drop tables first.
- **"Foreign key violation"**: Make sure you run the seeds in the correct order (Categories -> Services -> Offices/FAQs). The consolidated `seed.sql` handles this automatically.
