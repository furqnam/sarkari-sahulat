# 🚀 Quick Deployment Guide

## Prerequisites

1. **Install Git**: https://git-scm.com/download/win
2. **GitHub Account**: https://github.com
3. **Vercel Account**: https://vercel.com (sign up with GitHub)

## Required API Keys

Get these ready before deploying:

### Supabase
- URL: `https://your-project.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Service Role Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Anthropic
- API Key: `sk-ant-api03-...`

### Mapbox
- Token: `pk.eyJ1Ijoi...`

## 5-Minute Deployment

### 1. Initialize Git (in project folder)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repo
- Go to: https://github.com/new
- Name: `sarkari-sahulat`
- Click "Create repository"

### 3. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/sarkari-sahulat.git
git branch -M main
git push -u origin main
```

### 4. Deploy on Vercel
- Go to: https://vercel.com/new
- Import `sarkari-sahulat`
- Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ANTHROPIC_API_KEY`
  - `NEXT_PUBLIC_MAPBOX_TOKEN`
- Click "Deploy"

### 5. Done! 🎉
Your app is live at: `https://your-project.vercel.app`

## Test Your Deployment

Visit these URLs:
- `https://your-project.vercel.app/en` - English homepage
- `https://your-project.vercel.app/ur` - Urdu homepage
- `https://your-project.vercel.app/en/services` - Services
- `https://your-project.vercel.app/en/offices` - Office Finder

## Troubleshooting

**Build fails?**
- Check all environment variables are added
- Verify no syntax errors in code

**Runtime errors?**
- Check Supabase connection
- Verify API keys are correct
- Check browser console for errors

## Update Deployment

```bash
# Make changes to code
git add .
git commit -m "Update description"
git push

# Vercel auto-deploys!
```

---

**Need help?** See `DEPLOYMENT_CHECKLIST.md` for detailed guide.
