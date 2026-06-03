# AETERNA — Premium Clothing & Custom Print

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Full-stack e-commerce website untuk toko baju polos + jasa sablon custom.

---

## 🏗️ Teknologi

| Layer       | Teknologi                              |
|-------------|----------------------------------------|
| Frontend    | Vue 3 + Composition API + Vite         |
| Styling     | Tailwind CSS                           |
| State       | Pinia                                  |
| HTTP Client | Axios                                  |
| Backend     | Node.js + Express.js                   |
| Database    | MySQL                                  |
| Auth        | JWT + bcrypt                           |
| Upload      | Multer                                 |

---

## 📁 Struktur Project

```
aeterna-project/
├── database.sql                  # Schema + seed data MySQL
├── aeterna-backend/
│   ├── index.js                  # Entry point Express
│   ├── .env                      # Environment variables
│   ├── config/
│   │   └── db.js                 # MySQL pool connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── printController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── roleMiddleware.js     # Role-based access
│   │   └── errorHandler.js      # Global error handler
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── api.js               # Cart, Orders, Prints, Admin
│   └── uploads/                 # Uploaded design files
│
└── aeterna-frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.js
        ├── App.vue
        ├── assets/
        │   └── main.css
        ├── services/
        │   └── api.js            # Axios instance
        ├── stores/               # Pinia stores
        │   ├── auth.js
        │   ├── cart.js
        │   ├── products.js
        │   └── orders.js
        ├── router/
        │   └── index.js
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.vue
        │   │   ├── Footer.vue
        │   │   └── AdminLayout.vue
        │   └── ui/
        │       └── ProductCard.vue
        └── views/
            ├── HomeView.vue
            ├── LoginView.vue
            ├── RegisterView.vue
            ├── user/
            │   ├── CatalogView.vue
            │   ├── ProductDetailView.vue
            │   ├── CartView.vue
            │   ├── CheckoutView.vue
            │   ├── OrdersView.vue
            │   ├── OrderDetailView.vue
            │   ├── ProfileView.vue
            │   └── CustomPrintView.vue
            └── admin/
                ├── DashboardView.vue
                ├── ProductsView.vue
                ├── OrdersView.vue
                ├── UsersView.vue
                └── PrintsView.vue
```

---

## ⚙️ Cara Menjalankan

### Prasyarat
- Node.js >= 18.x
- MySQL 8.x berjalan
- npm atau yarn

---

### 1. Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan file SQL
source /path/to/aeterna-project/database.sql;
# ATAU
mysql -u root -p < database.sql
```

---

### 2. Setup Backend

```bash
cd aeterna-backend

# Install dependencies
npm install

# Sesuaikan konfigurasi database di .env
# Edit file .env:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password   # ← Sesuaikan ini
DB_NAME=aeterna_db
JWT_SECRET=aeterna_super_secret_jwt_key_2024_change_in_production

# Jalankan backend
npm run dev
# Backend berjalan di http://localhost:3001
```

---

### 3. Setup Frontend

```bash
cd aeterna-frontend

# Install dependencies
npm install

# Jalankan frontend
npm run dev
# Frontend berjalan di http://localhost:5173
```

---

### 4. Akses Aplikasi

Buka browser → **http://localhost:5173**

---

## 🔑 Akun Demo

| Role  | Email                | Password |
|-------|----------------------|----------|
| Admin | admin@aeterna.id     | password |
| User  | budi@example.com     | password |
| User  | sari@example.com     | password |
| User  | rizky@example.com    | password |

---

## 📡 Contoh Request API

### Auth

```bash
# Register
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "08123456789"
}

# Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "admin@aeterna.id",
  "password": "password"
}

# Get Profile (requires token)
GET /api/auth/profile
Authorization: Bearer <token>
```

### Products

```bash
# Get all products (public)
GET /api/products?page=1&limit=12&category=kaos&sort=newest

# Get product by slug (public)
GET /api/products/slug/kaos-polos-cotton-combed-30s

# Create product (admin only)
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "name": "Kaos Baru",
  "category": "kaos",
  "base_price": 85000,
  "description": "Deskripsi produk",
  "image": "https://example.com/image.jpg",
  "is_active": true,
  "is_customizable": true
}
```

### Cart

```bash
# Get cart
GET /api/cart
Authorization: Bearer <token>

# Add to cart
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json
{
  "product_id": 1,
  "variant_id": 2,
  "quantity": 2
}

# Update quantity
PUT /api/cart/1
Authorization: Bearer <token>
Content-Type: application/json
{ "quantity": 3 }

# Remove item
DELETE /api/cart/1
Authorization: Bearer <token>
```

### Orders

```bash
# Create order (checkout)
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json
{
  "shipping_name": "Budi Santoso",
  "shipping_phone": "081234567890",
  "shipping_address": "Jl. Contoh No. 1, Batam",
  "payment_method": "transfer",
  "notes": "Tolong dibungkus rapi"
}

# My orders
GET /api/orders/my
Authorization: Bearer <token>

# Order detail
GET /api/orders/my/1
Authorization: Bearer <token>

# Admin: Update order status
PUT /api/admin/orders/1/status
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "status": "shipped",
  "payment_status": "paid"
}
```

### Custom Print

```bash
# Submit custom print (multipart/form-data)
POST /api/prints
Authorization: Bearer <token>
Content-Type: multipart/form-data

Fields:
- product_id: 1
- print_location: front
- print_technique: sablon
- quantity: 50
- design_notes: "Logo perusahaan di dada kiri"
- design_file: <file>

# Admin: Update print status
PUT /api/admin/prints/1/status
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "status": "approved",
  "estimated_price": 3500000,
  "admin_notes": "Desain sudah disetujui, siap produksi"
}
```

### Admin

```bash
# Dashboard stats
GET /api/admin/dashboard
Authorization: Bearer <admin_token>

# All users
GET /api/admin/users?search=budi&role=user
Authorization: Bearer <admin_token>

# Update user role
PUT /api/admin/users/2/role
Authorization: Bearer <admin_token>
Content-Type: application/json
{ "role": "admin" }
```

---

## 🔒 Keamanan

- Semua query menggunakan **prepared statements** (anti SQL injection)
- Password di-hash dengan **bcrypt** (salt rounds: 10)
- Protected routes menggunakan **JWT Bearer token**
- **Role-based access control** (user vs admin)
- File upload dibatasi tipe dan ukuran (max 5MB)
- CORS dikonfigurasi hanya untuk origin frontend

---

## 🚀 Build Production

```bash
# Frontend
cd aeterna-frontend
npm run build
# Output: dist/

# Backend
cd aeterna-backend
NODE_ENV=production node index.js
```

---

## 📝 Catatan

- Ubah `JWT_SECRET` di `.env` backend sebelum production
- Untuk production, gunakan cloud storage (S3/GCS) untuk file upload
- Sesuaikan `FRONTEND_URL` di backend `.env` dengan domain production
- Tambahkan payment gateway (Midtrans/Xendit) untuk pembayaran nyata
