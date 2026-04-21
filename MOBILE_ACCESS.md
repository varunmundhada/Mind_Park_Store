# 📱 Access Mind Park Store on Your Phone

## Quick Setup Guide for Mobile Testing

---

## 🚀 Option 1: Using Ngrok (Recommended - Easy & Fast)

### Step 1: Install Ngrok
```bash
# Download from https://ngrok.com/download
# Or install via package manager:

# Windows (using Chocolatey)
choco install ngrok

# Or download the exe and add to PATH
```

### Step 2: Start Your App
```bash
# Terminal 1: Start the app
npm run dev
```

This will start:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Step 3: Create Tunnels

Open **two new terminals**:

```bash
# Terminal 2: Tunnel for Frontend (React)
ngrok http 5173

# Terminal 3: Tunnel for Backend (API)
ngrok http 5000
```

### Step 4: Update Configuration

Ngrok will give you URLs like:
- Frontend: `https://abc123.ngrok-free.app`
- Backend: `https://xyz789.ngrok-free.app`

**Update your `.env` files:**

1. **server/.env** - Update CLIENT_URL:
```env
CLIENT_URL=https://abc123.ngrok-free.app
```

2. **Restart your backend server** (Ctrl+C and `npm run dev` again in server folder)

3. **Update client API URL** - Create/edit `client/.env`:
```env
VITE_API_URL=https://xyz789.ngrok-free.app
```

4. **Update client/src/api/client.js** to use the env variable

5. **Restart your frontend** (Ctrl+C and `npm run dev` again in client folder)

### Step 5: Access on Phone
Open the **frontend ngrok URL** on your phone browser:
```
https://abc123.ngrok-free.app
```

---

## 🌐 Option 2: Using Localtunnel (No Account Needed)

### Step 1: Install Localtunnel
```bash
npm install -g localtunnel
```

### Step 2: Start Your App
```bash
npm run dev
```

### Step 3: Create Tunnels

Open **two new terminals**:

```bash
# Terminal 2: Tunnel for Frontend
lt --port 5173 --subdomain mindpark-app

# Terminal 3: Tunnel for Backend  
lt --port 5000 --subdomain mindpark-api
```

You'll get URLs like:
- Frontend: `https://mindpark-app.loca.lt`
- Backend: `https://mindpark-api.loca.lt`

### Step 4: Update Configuration (same as Ngrok above)

---

## 📡 Option 3: Using Cloudflare Tunnel (Free & Reliable)

### Step 1: Install Cloudflared
```bash
# Windows
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Or use package manager
winget install --id Cloudflare.cloudflared
```

### Step 2: Start Your App
```bash
npm run dev
```

### Step 3: Create Tunnels

Open **two new terminals**:

```bash
# Terminal 2: Tunnel for Frontend
cloudflared tunnel --url http://localhost:5173

# Terminal 3: Tunnel for Backend
cloudflared tunnel --url http://localhost:5000
```

### Step 4: Update Configuration (same as above)

---

## 🏠 Option 4: Local Network Access (Same WiFi)

**Easiest if your phone and computer are on the same WiFi!**

### Step 1: Find Your Computer's IP Address

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your WiFi adapter
# Example: 192.168.1.100
```

### Step 2: Update Vite Config

Edit `client/vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,
  }
})
```

### Step 3: Update Backend to Allow CORS

Edit `server/.env`:
```env
CLIENT_URL=http://192.168.1.100:5173
```

### Step 4: Start Your App
```bash
npm run dev
```

### Step 5: Access on Phone
On your phone (connected to same WiFi), open:
```
http://192.168.1.100:5173
```

Replace `192.168.1.100` with your actual IP address.

---

## 🔧 Quick Setup Script

I'll create a helper script for you!

---

## ⚠️ Important Notes

### For Ngrok:
- Free tier has session limits
- URLs change each time you restart (unless you have a paid account)
- May show a warning page first time - click "Visit Site"

### For Localtunnel:
- Completely free
- May show a password prompt - just click "Continue"
- Less stable than Ngrok

### For Cloudflare:
- Very reliable and fast
- Free forever
- URLs change each restart

### For Local Network:
- Fastest option
- Only works on same WiFi
- No internet required
- Most secure

---

## 🎯 Recommended Approach

**For Quick Testing:** Use **Local Network** (Option 4)
- Fastest and easiest
- No external tools needed
- Just need same WiFi

**For Sharing with Others:** Use **Ngrok** (Option 1)
- Most reliable
- Works from anywhere
- Professional solution

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
- Make sure both frontend and backend tunnels are running
- Check that you updated the CLIENT_URL in server/.env
- Restart the backend after changing .env

### Issue: "CORS Error"
- Update CLIENT_URL in server/.env to match your tunnel URL
- Restart the backend server

### Issue: Ngrok shows "Too Many Connections"
- Free tier limit reached
- Try Localtunnel or Cloudflare instead
- Or wait a few minutes

### Issue: "ERR_CONNECTION_REFUSED" on phone
- Check if your computer firewall is blocking connections
- Make sure you're using the correct IP address
- Verify both devices are on same WiFi (for local network option)

---

## 📞 Need Help?

1. Make sure your app runs fine on `localhost:5173` first
2. Check that MongoDB is running
3. Verify all environment variables are set correctly
4. Try the Local Network option first (easiest to debug)

---

**Happy Mobile Testing! 📱✨**
