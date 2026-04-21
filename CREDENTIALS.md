# Mind Park Store - Login Credentials

## 🔐 Test Accounts

All accounts use the same password for easy testing: **Password123!**

---

### 👨‍💼 Admin / Seller Account
**Full access to admin dashboard, product management, order operations, and Galla desk**

- **Email:** `admin@mindpark.org`
- **Password:** `Password123!`
- **Role:** Seller
- **Name:** Mind Park Admin

**Access to:**
- ✅ Admin Dashboard (`/admin`)
- ✅ Galla Desk (`/galla`)
- ✅ Product Management (Create, Edit, Delete)
- ✅ Order Management (Full control)
- ✅ Inventory Control
- ✅ All customer features

---

### 🏪 Shubharti Account
**Limited access to Galla desk for order status updates**

- **Email:** `shubharti@mindpark.org`
- **Password:** `Password123!`
- **Role:** Shubharti
- **Name:** Mind Park Shubharti Desk

**Access to:**
- ✅ Galla Desk (`/galla`)
- ✅ Order Status Updates (Limited)
- ✅ Basic customer features
- ❌ Cannot access Admin Dashboard
- ❌ Cannot manage products

---

### 🛍️ Customer / Buyer Account
**Standard customer account with shopping and order tracking**

- **Email:** `buyer@mindpark.org`
- **Password:** `Password123!`
- **Role:** Buyer
- **Name:** Supportive Buyer

**Access to:**
- ✅ Shop & Browse Products
- ✅ Add to Cart & Checkout
- ✅ View Orders (`/orders`)
- ✅ Wishlist Management
- ✅ Order Tracking
- ❌ Cannot access Admin Dashboard
- ❌ Cannot access Galla Desk

---

## 🚀 Quick Start

1. **Seed the database** (if not already done):
   ```bash
   npm run seed
   ```

2. **Start the application**:
   ```bash
   npm run dev
   ```

3. **Login URLs**:
   - Customer Login: `http://localhost:5173/auth`
   - Admin Login: `http://localhost:5173/admin/login`
   - Shubharti uses customer login page

---

## 📝 Testing Flow

### Test Admin Features:
1. Login with `admin@mindpark.org`
2. Go to `/admin` - See dashboard with stats
3. Create/Edit/Delete products
4. Manage orders and update status
5. Access Galla desk at `/galla`

### Test Shubharti Features:
1. Login with `shubharti@mindpark.org`
2. Go to `/galla` - See order operations
3. Update order status (limited permissions)
4. Cannot access `/admin` (will redirect)

### Test Customer Features:
1. Login with `buyer@mindpark.org`
2. Browse products at `/shop`
3. Add items to cart
4. Checkout and place order
5. View orders at `/orders`
6. Manage wishlist

---

## 🔄 Password Reset

All passwords are hashed using bcrypt. If you need to change passwords:

1. Edit `server/data/seedData.js`
2. Change the password field
3. Run `npm run seed` again

---

## ⚠️ Important Notes

- These are **test credentials** for development only
- Never use these in production
- The seed script clears all data before inserting
- All accounts have pre-configured avatars
- One sample order is created for the buyer account

---

## 🎯 Role Permissions Summary

| Feature | Admin | Shubharti | Customer |
|---------|-------|-----------|----------|
| Browse Products | ✅ | ✅ | ✅ |
| Add to Cart | ✅ | ✅ | ✅ |
| Place Orders | ✅ | ✅ | ✅ |
| View Own Orders | ✅ | ✅ | ✅ |
| Wishlist | ✅ | ✅ | ✅ |
| Admin Dashboard | ✅ | ❌ | ❌ |
| Product Management | ✅ | ❌ | ❌ |
| View All Orders | ✅ | ✅ | ❌ |
| Update Order Status | ✅ (Full) | ✅ (Limited) | ❌ |
| Galla Desk | ✅ | ✅ | ❌ |

---

**Happy Testing! 🎉**
