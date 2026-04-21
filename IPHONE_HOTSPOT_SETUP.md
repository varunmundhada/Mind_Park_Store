# 📱 iPhone Hotspot Setup Guide

## The Problem
When using iPhone hotspot, the phone can't directly access the PC's IP address due to iOS network isolation.

## ✅ Solution: Use Ngrok (Best for iPhone Hotspot)

Since iPhone hotspot has network restrictions, we need to use a tunneling service like Ngrok.

---

## 🚀 Quick Setup with Ngrok

### Step 1: Install Ngrok

**Option A: Download Directly**
1. Go to: https://ngrok.com/download
2. Download the Windows version
3. Extract the `ngrok.exe` file
4. Move it to a folder in your PATH (or just keep it in your project folder)

**Option B: Using Chocolatey (if installed)**
```bash
choco install ngrok
```

### Step 2: Start Your App
```bash
npm run dev
```

Keep this terminal running.

### Step 3: Create Tunnels

**Open a NEW terminal (Terminal 2):**
```bash
ngrok http 5173
```

You'll see output like:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:5173
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

**Open ANOTHER NEW terminal (Terminal 3):**
```bash
ngrok http 5000
```

You'll see:
```
Forwarding   https://xyz789.ngrok-free.app -> http://localhost:5000
```

**Copy this HTTPS URL too** (e.g., `https://xyz789.ngrok-free.app`)

### Step 4: Update Configuration Files

**1. Update `server/.env`:**
```env
CLIENT_URL=https://abc123.ngrok-free.app
```
(Use YOUR frontend ngrok URL)

**2. Create `client/.env`:**
```env
VITE_API_URL=https://xyz789.ngrok-free.app/api
```
(Use YOUR backend ngrok URL)

### Step 5: Restart Your App

1. Go back to Terminal 1 (where npm run dev is running)
2. Press `Ctrl+C` to stop
3. Run again:
```bash
npm run dev
```

### Step 6: Access on iPhone

Open Safari or Chrome on your iPhone and go to:
```
https://abc123.ngrok-free.app
```
(Use YOUR frontend ngrok URL)

**First time:** Ngrok will show a warning page - just click "Visit Site"

---

## 🎯 Complete Example

Let's say ngrok gives you:
- Frontend: `https://abc123.ngrok-free.app`
- Backend: `https://xyz789.ngrok-free.app`

**Your `server/.env` should have:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mindpark
JWT_SECRET=change_this_secret
CLIENT_URL=https://abc123.ngrok-free.app
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=rzp_test_SgDkSPfdVjcjfQ
RAZORPAY_KEY_SECRET=sh7Gs0lOOs7UN9ou0MqIuDBY
RAZORPAY_CURRENCY=INR
```

**Your `client/.env` should have:**
```env
VITE_API_URL=https://xyz789.ngrok-free.app/api
```

---

## 🐛 Troubleshooting

### "Load Failed" Error
**Cause:** Backend URL not configured properly

**Fix:**
1. Make sure you created `client/.env` with VITE_API_URL
2. Restart the frontend (Ctrl+C and npm run dev)
3. Clear browser cache on iPhone

### "Cannot connect to server"
**Cause:** CLIENT_URL in server/.env doesn't match

**Fix:**
1. Update `server/.env` with frontend ngrok URL
2. Restart backend server

### Ngrok URLs Change Every Time
**Normal behavior for free tier**

**Solutions:**
- Keep ngrok terminals running (don't close them)
- If you restart ngrok, update .env files with new URLs
- Or get ngrok paid account for static URLs

### "ERR_TUNNEL_CONNECTION_FAILED"
**Cause:** Ngrok tunnel closed

**Fix:**
- Make sure ngrok terminals are still running
- Restart ngrok if needed

---

## 💡 Pro Tips

### Keep Everything Running
You'll have 3 terminals open:
1. **Terminal 1:** `npm run dev` (your app)
2. **Terminal 2:** `ngrok http 5173` (frontend tunnel)
3. **Terminal 3:** `ngrok http 5000` (backend tunnel)

### Save Your URLs
Write down your ngrok URLs so you don't have to look them up:
- Frontend: ___________________________
- Backend: ___________________________

### Test Locally First
Before using ngrok, make sure the app works on `http://localhost:5173`

---

## ✅ Success Checklist

- [ ] Ngrok installed
- [ ] App running: `npm run dev`
- [ ] Frontend tunnel: `ngrok http 5173`
- [ ] Backend tunnel: `ngrok http 5000`
- [ ] `server/.env` updated with frontend URL
- [ ] `client/.env` created with backend URL
- [ ] App restarted after config changes
- [ ] Can access frontend URL on iPhone
- [ ] Can login and browse products

---

## 🎉 You're Ready!

Once everything is set up, you can access your Mind Park Store from your iPhone even when using hotspot!

**The URLs work from anywhere with internet, not just your iPhone!**
