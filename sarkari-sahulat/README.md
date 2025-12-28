# SarkariSahulat - Government Services Super-App for Pakistan

A comprehensive mobile-first web application providing AI-powered guidance for Pakistani government services.

## 🚀 Features

- **AI Chat Assistant** - Get instant answers about government services using Claude AI
- **Services Directory** - Browse 100+ government services with complete details
- **Office Finder** - Find nearest government offices with map integration
- **Document Checklist** - Generate personalized checklists for any service
- **Fee Calculator** - Calculate total costs including urgency options
- **Government Schemes** - Discover available programs and benefits
- **Bilingual Support** - Full English and Urdu translations with RTL support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude AI (Anthropic)
- **Maps**: Mapbox
- **Internationalization**: next-intl
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- Anthropic API key (Claude AI)
- Mapbox account (free tier)

## 🔧 Installation

### 1. Clone and Install Dependencies

```bash
cd sarkari-sahulat
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your API keys:

```bash
# Copy env.example.txt to .env.local
# Then edit .env.local with your actual keys
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `ANTHROPIC_API_KEY` - Your Anthropic API key for Claude
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token

### 3. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the database migrations (coming soon in `supabase/migrations/`)
3. Seed the database with initial data (script coming soon)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

The app will redirect to `/en` (English) by default. Access `/ur` for Urdu version.

## 📁 Project Structure

```
sarkari-sahulat/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Homepage
│   │   ├── services/      # Services pages
│   │   ├── offices/       # Office finder pages
│   │   └── schemes/       # Government schemes pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/
│   ├── chat/              # Chat interface components
│   ├── services/          # Service-related components
│   ├── offices/           # Office finder components
│   ├── tools/             # Tools (checklist, calculator)
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase client config
│   ├── ai/                # AI integration
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
├── messages/              # i18n translations (en.json, ur.json)
└── supabase/             # Database migrations and seeds
```

## 🌍 Internationalization

The app supports English and Urdu with automatic RTL layout for Urdu.

- English: `/en/*`
- Urdu: `/ur/*`

Translations are in `messages/en.json` and `messages/ur.json`.

## 🗄️ Database Schema

Main tables:
- `services` - Government services information
- `service_categories` - Service categories
- `offices` - Government office locations
- `government_schemes` - Available schemes and programs
- `faqs` - Frequently asked questions
- `user_reminders` - User reminders (optional feature)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Supabase Setup

1. Create production Supabase project
2. Run migrations
3. Update environment variables with production credentials

## 📝 Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Shadcn/ui integration
- [x] Supabase client setup
- [x] Internationalization (next-intl)
- [x] Basic folder structure
- [x] Type definitions

### Phase 2: Core Features (Next)
- [ ] Database schema and migrations
- [ ] Seed data for services and offices
- [ ] AI chat interface
- [ ] Service browsing and search
- [ ] Office finder with maps
- [ ] Document checklist generator
- [ ] Fee calculator

### Phase 3: Polish & Launch
- [ ] Complete Urdu translations
- [ ] Mobile optimization
- [ ] Performance tuning
- [ ] Testing
- [ ] Production deployment

## 🤝 Contributing

This is an MVP project. Contributions welcome after initial launch.

## 📄 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

This is an informational platform and is not officially affiliated with the Government of Pakistan. All information is provided for guidance purposes only. Please verify details with official government sources.

## 📞 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ for Pakistani citizens
