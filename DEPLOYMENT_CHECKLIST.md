# ✅ Vercel Deployment Checklist

## Before You Start
- [ ] GitHub account created
- [ ] Vercel account created (use GitHub to sign up)
- [ ] MongoDB Atlas account created

---

## Step 1: MongoDB Atlas Setup
- [ ] Created free cluster
- [ ] Created database user (username: `mindpark`)
- [ ] Saved password securely
- [ ] Added IP whitelist (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Replaced `<password>` in connection string
- [ ] Added `/mindpark` database name to connection string

**Your connection string should look like:**
```
mongodb+srv://mindpark:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mindpark?retryWrites=true&w=majority
```

---

## Step 2: Push to GitHub
- [ ] Initialized git: `git init`
- [ ] Added files: `git add .`
- [ ] Committed: `git commit -m "Initial commit"`
- [ ] Created GitHub repository
- [ ] Added remote: `git remote add origin YOUR_REPO_URL`
- [ ] Pushed: `git push -u origin main`

---

## Step 3: Deploy Backend to Vercel
- [ ] Logged into Vercel
- [ ] Clicked "Add New" → "Project"
- [ ] Imported GitHub repository
- [ ] Set Root Directory: `server`
- [ ] Set Framework Preset: Other
- [ ] Added environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] CLIENT_URL (temporary value)
  - [ ] RAZORPAY_KEY_ID
  - [ ] RAZORPAY_KEY_SECRET
  - [ ] RAZORPAY_CURRENCY
- [ ] Clicked Deploy
- [ ] Copied backend URL: `_______________________________`

---

## Step 4: Deploy Frontend to Vercel
- [ ] Clicked "Add New" → "Project"
- [ ] Imported SAME GitHub repository
- [ ] Set Root Directory: `client`
- [ ] Set Framework Preset: Vite
- [ ] Added environment variable:
  - [ ] VITE_API_URL (backend URL + `/api`)
- [ ] Clicked Deploy
- [ ] Copied frontend URL: `_______________________________`

---

## Step 5: Update Backend Configuration
- [ ] Went to backend project on Vercel
- [ ] Settings → Environment Variables
- [ ] Updated CLIENT_URL to frontend URL
- [ ] Saved changes
- [ ] Deployments → Redeployed

---

## Step 6: Seed Database
- [ ] Updated local `server/.env` with MongoDB Atlas URL
- [ ] Ran: `npm run seed`
- [ ] Verified seed completed successfully

---

## Step 7: Test Everything
- [ ] Opened frontend URL in browser
- [ ] Homepage loads correctly
- [ ] Products page shows items
- [ ] Images load properly
- [ ] Can add items to cart
- [ ] Login works (buyer@mindpark.org / Password123!)
- [ ] Can place order
- [ ] Admin login works (admin@mindpark.org / Password123!)
- [ ] Admin dashboard accessible
- [ ] Can manage products

---

## Step 8: Test on iPhone
- [ ] Opened frontend URL on iPhone Safari
- [ ] App loads without errors
- [ ] Can browse products
- [ ] Can login
- [ ] Can add to cart
- [ ] Can checkout
- [ ] All features work smoothly

---

## 🎉 Deployment Complete!

**Your URLs:**
- Frontend: `_______________________________`
- Backend: `_______________________________`

**Share these URLs with anyone to test your app!**

---

## 📝 Save These Details

**MongoDB Atlas:**
- Cluster Name: `_______________________________`
- Username: `mindpark`
- Password: `_______________________________`
- Connection String: `_______________________________`

**Vercel:**
- Frontend URL: `_______________________________`
- Backend URL: `_______________________________`

**GitHub:**
- Repository: `_______________________________`

---

## 🔄 Future Updates

To update your app:
```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy! ✨

---

## 🆘 Need Help?

- **Detailed Guide:** `VERCEL_DEPLOYMENT.md`
- **Quick Start:** `DEPLOY_QUICK_START.md`
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.atlas.mongodb.com

---

**Congratulations on deploying your app! 🚀**
