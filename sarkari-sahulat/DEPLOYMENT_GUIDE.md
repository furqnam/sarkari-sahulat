# SarkariSahulat - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Supabase project created
- ✅ Database schema applied
- ✅ Seed data loaded
- ✅ Anthropic API key
- ✅ Mapbox token
- ✅ GitHub account
- ✅ Vercel account

## Step 1: Prepare Environment Variables

Create a `.env.production` file with all required variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic (Claude AI)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# App URL (will be your Vercel URL)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Step 2: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SarkariSahulat MVP"
   ```

2. **Create GitHub Repository**:
   - Go to github.com
   - Click "New repository"
   - Name it `sarkari-sahulat`
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sarkari-sahulat.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your `sarkari-sahulat` repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each variable from your `.env.production`
   - Make sure to add them for **Production**, **Preview**, and **Development**

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? sarkari-sahulat
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN

# Deploy to production
vercel --prod
```

## Step 4: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `sarkarisahulat.com`)

2. **Update DNS**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

3. **Update Environment Variable**:
   ```env
   NEXT_PUBLIC_APP_URL=https://sarkarisahulat.com
   ```

## Step 5: Verify Deployment

### Test Checklist

- [ ] Homepage loads correctly
- [ ] Chat interface works
- [ ] Services page displays data
- [ ] Office finder shows map
- [ ] Schemes page loads
- [ ] Calculator works
- [ ] Checklist generator works
- [ ] Urdu version works (`/ur`)
- [ ] All links work
- [ ] Mobile responsive
- [ ] No console errors

### Test URLs

```
https://your-app.vercel.app/en
https://your-app.vercel.app/ur
https://your-app.vercel.app/en/services
https://your-app.vercel.app/en/offices
https://your-app.vercel.app/en/schemes
https://your-app.vercel.app/en/tools/calculator
https://your-app.vercel.app/en/tools/checklist
```

## Step 6: Post-Deployment Tasks

### 1. Set up Analytics (Optional)

**Vercel Analytics**:
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics** (Optional):
- Create GA4 property
- Add tracking code to layout

### 2. Set up Error Monitoring (Optional)

**Sentry**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 3. Set up SEO

Add to `app/[locale]/layout.tsx`:
```tsx
export const metadata = {
  title: 'SarkariSahulat - Pakistani Government Services Guide',
  description: 'Complete guide to Pakistani government services with AI assistance',
  keywords: 'pakistan, government, services, nadra, passport, cnic',
  openGraph: {
    title: 'SarkariSahulat',
    description: 'Your complete guide to Pakistani government services',
    url: 'https://your-domain.com',
    siteName: 'SarkariSahulat',
    locale: 'en_PK',
    type: 'website',
  },
};
```

### 4. Create sitemap.xml

Create `app/sitemap.ts`:
```tsx
export default function sitemap() {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/services',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/offices',
      lastModified: new Date(),
    },
    {
      url: 'https://your-domain.com/schemes',
      lastModified: new Date(),
    },
  ];
}
```

### 5. Create robots.txt

Create `app/robots.ts`:
```tsx
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-domain.com/sitemap.xml',
  };
}
```

## Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Run `npm install` locally and commit `package-lock.json`

**Error**: "Environment variable not found"
- **Solution**: Add missing env vars in Vercel dashboard

### Runtime Errors

**Error**: "Supabase connection failed"
- **Solution**: Check Supabase URL and keys are correct

**Error**: "Mapbox token invalid"
- **Solution**: Verify Mapbox token is public token (starts with `pk.`)

### Performance Issues

**Slow loading**:
- Enable Vercel Edge Functions
- Add caching headers
- Optimize images

## Monitoring

### Vercel Dashboard

Monitor:
- Deployments
- Analytics
- Logs
- Performance metrics

### Supabase Dashboard

Monitor:
- Database usage
- API requests
- Storage usage

### Anthropic Dashboard

Monitor:
- API usage
- Token consumption
- Costs

## Costs Estimate

### Free Tier (MVP)

- **Vercel**: Free (Hobby plan)
- **Supabase**: Free (up to 500MB database)
- **Mapbox**: Free (50K map loads/month)
- **Anthropic**: ~$5-10/month (pay-as-you-go)

**Total**: ~$5-10/month

### Scaling (1000 users/day)

- **Vercel**: Free or $20/month (Pro)
- **Supabase**: $25/month (Pro)
- **Mapbox**: Free (within limits)
- **Anthropic**: ~$50/month

**Total**: ~$75-95/month

## Maintenance

### Regular Tasks

**Weekly**:
- Check error logs
- Monitor API usage
- Review analytics

**Monthly**:
- Update dependencies
- Review costs
- Update content

**Quarterly**:
- Security audit
- Performance review
- User feedback review

## Backup Strategy

### Database

**Supabase**:
- Automatic daily backups (Pro plan)
- Manual backups via dashboard
- Export SQL dumps

### Code

**GitHub**:
- All code version controlled
- Regular commits
- Protected main branch

## Security

### Best Practices

- ✅ Environment variables in Vercel (not in code)
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Supabase RLS policies enabled
- ✅ API keys rotated regularly
- ✅ Dependencies updated regularly

### Headers

Add to `next.config.ts`:
```tsx
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ];
}
```

## Success Metrics

### Track

- Page views
- User sessions
- Chat interactions
- Service searches
- Office finder usage
- Tool usage
- Bounce rate
- Time on site

### Goals

- 1000 users/month (Month 1)
- 5000 users/month (Month 3)
- 10000 users/month (Month 6)

---

## Deployment Complete! 🎉

Your SarkariSahulat MVP is now live and accessible to users across Pakistan!

### What's Next?

1. **Share**: Promote on social media
2. **Gather Feedback**: Talk to users
3. **Iterate**: Add features based on feedback
4. **Scale**: Optimize as usage grows

**Congratulations on launching!** 🚀
