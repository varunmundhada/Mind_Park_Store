# Mind Park Foundation Marketplace

Purpose-driven marketplace for an NGO that supports people with schizophrenia, dementia, and other neurocognitive conditions by selling handmade products and cafe offerings online.

## Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express + MongoDB + JWT
- Media: Cloudinary-ready upload flow

## Structure

- `client/` React application
- `server/` Express API

## Quick start

1. Install dependencies:
   `npm run install:all`
2. Copy `server/.env.example` to `server/.env`
3. Start the apps:
   `npm run dev`
4. Seed sample data:
   `npm run seed`

## Demo accounts

- Admin: `admin@mindpark.org` / `Password123!`
- Buyer: `buyer@mindpark.org` / `Password123!`

If Cloudinary is not configured, product image upload gracefully falls back to a direct image URL field in the admin product form.
