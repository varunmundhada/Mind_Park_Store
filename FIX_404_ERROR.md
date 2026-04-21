# 🔧 Fix 404 Error on Frontend

## The Problem
Your frontend at `https://mind-park-store.vercel.app` is getting 404 errors because it can't connect to the backend API.

---

## ✅ Solution - Check These Things

### 1️⃣ **What's Your Backend URL?**

Go to Vercel dashboard and find your backend project URL.

It should be something like:
- `https://mindpark-api.vercel.app`
- `https://mind-park-store-api.vercel.app`
- `https://mind-park-store-server.vercel.app`

**Write it down:** `_________________________________`

---

### 2️⃣ **Update Frontend Environment Variable**

#### On Vercel:

1. Go to your **frontend project** on Vercel
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Find `VITE_API_URL`

**Should be:**
```
https://YOUR-BACKEND-URL.vercel.app/api
```

**Important:** 
- ✅ Must end with `/api`
- ✅ Must be HTTPS
- ✅ Must be your actual backend URL

#### Example:
If your backend is: `https://mindpark-api.vercel.app`

Then `VITE_API_URL` should be: `https://mindpark-api.vercel.app/api`

5. Click **Save**
6. Go to **Deployments** tab
7. Click **...** on latest deployment
8. Click **Redeploy**

---

### 3️⃣ **Update Backend Environment Variable**

#### On Vercel:

1. Go to your **backend project** on Vercel
2. Click **Settings** tab
3. Click **Environment Variables**
4. Find `CLIENT_URL`

**Should be:**
```
https://mind-park-store.vercel.app
```

5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy**

---

### 4️⃣ **Test Backend First**

Before testing frontend, make sure backend works:

Open in browser:
```
https://YOUR-BACKEND-URL.vercel.app/api/health
```

**Should see:**
```json
{"status":"ok","service":"Mind Park API"}
```

**If you get 500 error:**
- Make sure you pushed the serverless fixes (see FIX_AND_DEPLOY.md)
- Check backend deployment logs

**If you get 404:**
- Backend didn't deploy correctly
- Check if you set Root Directory to `server`

---

### 5️⃣ **Check Both Projects Are Deployed**

You should have **TWO separate projects** on Vercel:

**Project 1: Backend (API)**
- Root Directory: `server`
- Framework: Other
- URL: `https://something-api.vercel.app`

**Project 2: Frontend (Website)**
- Root Directory: `client`
- Framework: Vite
- URL: `https://mind-park-store.vercel.app`

---

## 🐛 Common Issues

### Issue 1: "Only deployed frontend, not backend"

**Solution:** Deploy backend separately
1. Go to Vercel
2. Click "Add New" → "Project"
3. Import SAME repository
4. Set Root Directory: `server`
5. Deploy

### Issue 2: "Wrong API URL in frontend"

**Solution:** 
1. Check `VITE_API_URL` in frontend settings
2. Must match your backend URL + `/api`
3. Redeploy frontend after changing

### Issue 3: "Backend returns 500 error"

**Solution:**
1. Push the serverless fixes (see FIX_AND_DEPLOY.md)
2. Check MongoDB connection string
3. Check backend logs on Vercel

### Issue 4: "CORS error"

**Solution:**
1. Update `CLIENT_URL` in backend to match frontend URL
2. Redeploy backend

---

## 📋 Quick Checklist

- [ ] Backend is deployed as separate project
- [ ] Backend Root Directory is `server`
- [ ] Frontend Root Directory is `client`
- [ ] `VITE_API_URL` in frontend = backend URL + `/api`
- [ ] `CLIENT_URL` in backend = frontend URL
- [ ] Backend `/api/health` returns 200 OK
- [ ] Both projects redeployed after env changes

---

## 🧪 Test Step by Step

### Step 1: Test Backend Health
```
https://YOUR-BACKEND-URL.vercel.app/api/health
```
✅ Should return: `{"status":"ok"}`

### Step 2: Test Backend Products
```
https://YOUR-BACKEND-URL.vercel.app/api/products
```
✅ Should return: `[]` or array of products

### Step 3: Test Frontend
```
https://mind-park-store.vercel.app
```
✅ Should load the homepage

### Step 4: Open Browser Console
Press F12 → Console tab
❌ Should NOT see 404 errors
✅ Should see successful API calls

---

## 🎯 Most Likely Issue

**You probably need to:**

1. **Check if backend is deployed**
   - Go to Vercel dashboard
   - Do you see TWO projects?
   - One for frontend, one for backend?

2. **If backend is NOT deployed:**
   - Deploy it as a separate project
   - Root Directory: `server`
   - Framework: Other

3. **If backend IS deployed:**
   - Copy the backend URL
   - Update `VITE_API_URL` in frontend
   - Add `/api` at the end
   - Redeploy frontend

---

## 💡 Pro Tip

**Check your browser console (F12):**

Look for the actual URL it's trying to call:
```
Failed to load: https://some-url.vercel.app/api/products
```

This tells you what URL the frontend is using. Make sure it matches your backend URL!

---

**Need help? Tell me:**
1. What's your backend URL?
2. What's your frontend URL?
3. What does `/api/health` return?

**I'll help you fix it! 🚀**
