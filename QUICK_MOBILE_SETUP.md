# 📱 Quick Mobile Setup (5 Minutes)

## Easiest Way - Local Network Access

### Step 1: Get Your Computer's IP Address
```bash
npm run network-ip
```

This will show you something like:
```
Frontend URL: http://192.168.1.100:5173
Backend URL:  http://192.168.1.100:5000
```

### Step 2: Update Server Configuration

Edit `server/.env` and update CLIENT_URL:
```env
CLIENT_URL=http://192.168.1.100:5173
```
(Replace with YOUR IP from Step 1)

### Step 3: Start the App
```bash
npm run dev
```

### Step 4: Open on Your Phone

1. Make sure your phone is on the **SAME WiFi** as your computer
2. Open browser on your phone
3. Go to: `http://192.168.1.100:5173` (use YOUR IP)

**That's it! 🎉**

---

## Alternative: Using Ngrok (Works from Anywhere)

### Step 1: Install Ngrok
Download from: https://ngrok.com/download

### Step 2: Start Your App
```bash
npm run dev
```

### Step 3: Open Two New Terminals

**Terminal 1 - Frontend Tunnel:**
```bash
ngrok http 5173
```
Copy the URL (e.g., `https://abc123.ngrok-free.app`)

**Terminal 2 - Backend Tunnel:**
```bash
ngrok http 5000
```
Copy the URL (e.g., `https://xyz789.ngrok-free.app`)

### Step 4: Update Configuration

1. Edit `server/.env`:
```env
CLIENT_URL=https://abc123.ngrok-free.app
```

2. Create `client/.env`:
```env
VITE_API_URL=https://xyz789.ngrok-free.app
```

3. Update `client/src/api/client.js` - change the base URL to use `import.meta.env.VITE_API_URL`

4. Restart both servers (Ctrl+C and `npm run dev` again)

### Step 5: Open on Phone
Go to the frontend ngrok URL on your phone: `https://abc123.ngrok-free.app`

---

## 🎯 Which Method to Use?

**Use Local Network if:**
- ✅ Your phone and computer are on same WiFi
- ✅ You want the fastest connection
- ✅ You don't want to install extra tools

**Use Ngrok if:**
- ✅ You want to share with someone not on your network
- ✅ You're on a restricted network
- ✅ You want a public URL

---

## 🐛 Troubleshooting

**Can't connect on phone?**
1. Check both devices are on same WiFi
2. Try disabling Windows Firewall temporarily
3. Make sure you updated CLIENT_URL in server/.env
4. Restart the backend server after changing .env

**CORS errors?**
- Make sure CLIENT_URL in server/.env matches your phone's URL
- Restart the backend server

**Ngrok shows warning page?**
- Just click "Visit Site" - it's normal for free tier

---

## 📞 Quick Commands Reference

```bash
# Get your network IP
npm run network-ip

# Start the app
npm run dev

# Seed database (if needed)
npm run seed

# Start ngrok tunnels (in separate terminals)
ngrok http 5173
ngrok http 5000
```

---

**Ready to test on mobile! 📱✨**
