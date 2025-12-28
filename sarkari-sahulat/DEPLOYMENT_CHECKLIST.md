# 🚀 SarkariSahulat - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Install Git (Required)
- [ ] Download Git from: https://git-scm.com/download/win
- [ ] Install with default settings
- [ ] Restart terminal/VS Code
- [ ] Verify: `git --version`

### 2. Create GitHub Account (if needed)
- [ ] Sign up at: https://github.com
- [ ] Verify email address

### 3. Create Vercel Account
- [ ] Sign up at: https://vercel.com
- [ ] Use "Continue with GitHub" option
- [ ] Authorize Vercel to access GitHub

### 4. Prepare API Keys

#### Supabase (Required for database)
- [ ] Go to: https://supabase.com
- [ ] Create new project
- [ ] Go to Settings → API
- [ ] Copy:
  - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
  - Anon/Public key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Service Role key: `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Apply database schema (see DATABASE_SETUP.md)
- [ ] Load seed data

#### Anthropic (Required for AI chat)
- [ ] Go to: https://console.anthropic.com
- [ ] Sign up / Log in
- [ ] Go to API Keys
- [ ] Create new key
- [ ] Copy: `ANTHROPIC_API_KEY`

#### Mapbox (Required for maps)
- [ ] Go to: https://mapbox.com
- [ ] Sign up / Log in
- [ ] Go to Account → Access Tokens
- [ ] Copy default public token: `NEXT_PUBLIC_MAPBOX_TOKEN`

---

## 📦 Step-by-Step Deployment

### Step 1: Initialize Git Repository

Open terminal in project folder and run:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - SarkariSahulat MVP"
```

### Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `sarkari-sahulat`
3. Description: "Pakistani Government Services Platform"
4. Visibility: Public or Private (your choice)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### Step 3: Push to GitHub

Copy the commands from GitHub (should look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/sarkari-sahulat.git
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username

### Step 4: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**:
   - Find `sarkari-sahulat` in the list
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY = your_supabase_service_role_key
   ANTHROPIC_API_KEY = sk-ant-api03-your-key
   NEXT_PUBLIC_MAPBOX_TOKEN = pk.your_mapbox_token
   NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
   ```

   **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live! 🎉

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production

# Deploy to production
vercel --prod
```

---

## 🧪 Post-Deployment Testing

### Test URLs (replace with your Vercel URL)

```
https://your-project.vercel.app/en
https://your-project.vercel.app/ur
https://your-project.vercel.app/en/services
https://your-project.vercel.app/en/offices
https://your-project.vercel.app/en/schemes
https://your-project.vercel.app/en/tools/calculator
https://your-project.vercel.app/en/tools/checklist
```

### Testing Checklist

- [ ] Homepage loads
- [ ] Chat interface works
- [ ] Services page shows data
- [ ] Office finder displays map
- [ ] Schemes page loads
- [ ] Calculator works
- [ ] Checklist generator works
- [ ] Urdu version works (`/ur`)
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔧 Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
# Solution: Install dependencies locally first
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

**Error**: "Environment variable not defined"
```
Solution: Double-check all environment variables in Vercel dashboard
```

### Runtime Errors

**Error**: "Failed to connect to Supabase"
```
Solution: 
1. Verify Supabase URL is correct
2. Check Supabase project is active
3. Ensure database schema is applied
```

**Error**: "Mapbox token invalid"
```
Solution:
1. Verify token starts with 'pk.' (public token)
2. Check token is not expired
3. Ensure token is added to Vercel env vars
```

**Error**: "Anthropic API error"
```
Solution:
1. Verify API key starts with 'sk-ant-'
2. Check you have credits in Anthropic account
3. Ensure key is added to Vercel env vars
```

---

## 🎯 Success Indicators

✅ **Deployment Successful** when:
- Build completes without errors
- Vercel provides a live URL
- Homepage loads correctly
- All features work as expected

---

## 📊 Monitoring

### Vercel Dashboard

Monitor:
- **Deployments**: View build logs
- **Analytics**: Track page views
- **Logs**: Debug runtime errors
- **Speed Insights**: Performance metrics

### Supabase Dashboard

Monitor:
- **Database**: Check queries
- **API**: Monitor requests
- **Storage**: Track usage

### Anthropic Dashboard

Monitor:
- **Usage**: Track API calls
- **Costs**: Monitor spending

---

## 💰 Cost Tracking

### Expected Costs (MVP)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100GB bandwidth | $0/month |
| Supabase | 500MB database | $0/month |
| Mapbox | 50K map loads | $0/month |
| Anthropic | Pay-as-you-go | ~$5-10/month |

**Total**: **~$5-10/month**

---

## 🔄 Updating Your Deployment

### Make Changes

```bash
# Make your code changes
# ...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push

# Vercel will automatically redeploy!
```

### Manual Redeploy

In Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. **Buy Domain** (from Namecheap, GoDaddy, etc.)

2. **In Vercel Dashboard**:
   - Go to Project → Settings → Domains
   - Add your domain (e.g., `sarkarisahulat.com`)
   - Follow DNS configuration instructions

3. **Update DNS**:
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel's IP

4. **Update Environment Variable**:
   ```
   NEXT_PUBLIC_APP_URL = https://sarkarisahulat.com
   ```

5. **Wait for DNS propagation** (5-30 minutes)

---

## 📈 Next Steps After Deployment

### Immediate
- [ ] Test all features
- [ ] Share with friends/family
- [ ] Gather initial feedback

### Week 1
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Fix any bugs

### Month 1
- [ ] Analyze user behavior
- [ ] Add requested features
- [ ] Optimize performance

---

## 🎉 Congratulations!

Your SarkariSahulat platform is now **LIVE** and helping Pakistani citizens!

**Your Live URL**: `https://your-project.vercel.app`

Share it with:
- Family and friends
- Social media
- Pakistani communities
- Government service users

---

## 📞 Support

### Issues?

1. Check Vercel deployment logs
2. Check browser console errors
3. Review environment variables
4. Consult documentation files

### Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Project README: See README.md

---

**Made with ❤️ for Pakistani Citizens**
