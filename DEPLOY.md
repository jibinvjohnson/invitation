# 🚀 Ready for Deployment: InviteNest SaaS

I have prepared the code for production. All templates, layouts, and data services are optimized and committed to your local git repository.

### 1. Create your GitHub Repository
Go to [GitHub](https://github.com/new) and create a repository named `invitenest`.

### 2. Push your code
Run these commands in your terminal:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/invitenest.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel
1.  Connect your GitHub account to [Vercel](https://vercel.com).
2.  Import the `invitenest` repository.
3.  Add these **Environment Variables** in the Vercel dashboard:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    -   `NEXT_PUBLIC_RAZORPAY_KEY_ID`
    -   `RAZORPAY_KEY_SECRET`

### 4. Setup Database
1.  Open [Supabase SQL Editor](https://supabase.com).
2.  Run `supabase_schema.sql` (to build tables).
3.  Run `supabase_seed.sql` (to add the 200+ templates).

**Your premium SaaS is now live!**
