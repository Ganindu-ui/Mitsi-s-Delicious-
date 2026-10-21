# 🍽️ Mitsi's Delicacies by Arabian Vibes (Colombo 03) - Full Stack Web Application

A modern, full-stack web application for **Mitsi's Delicacies by Arabian Vibes Restaurant & Cafe - Colombo 03**, featuring a high-performance **Node.js/Express REST API backend** with persistent storage, real-time order tracking, promo code verification, table reservations, and an operational kitchen dispatch dashboard connected to a luxurious React 19 frontend.

---

## ✨ Full-Stack Features

### 💻 Backend API (`backend/`)
- **Node.js + Express REST API**: Fast, modular service running on port `5001`.
- **Persistent Data Store (`backend/data/store.json`)**: Synchronized file-backed database preserving menu dishes, categories, promo codes, orders, table reservations, and guest reviews.
- **Order Management & Live Tracking**:
  - `POST /api/orders`: Generates unique Order IDs (`MITSI-XXXXXX`) and Tracking Codes (`TRK-XXXXXX`), calculates pricing, and queues orders in the kitchen.
  - `GET /api/orders/:id`: Real-time order status tracking (`confirmed` ➔ `preparing` ➔ `on_the_way` ➔ `delivered`).
  - `PATCH /api/orders/:id/status`: Kitchen portal dispatch status updates.
- **Promo Code Validation**:
  - `POST /api/promos/validate`: Validates promo codes against live subtotal (e.g., `MITSI10`, `ARABIAN20`, `COLOMBO500`, `SWEETTOOTH`).
- **Table Reservation Engine**:
  - `POST /api/reservations`: Allows guests to reserve dining tables for birthdays, anniversaries, or casual dining.
  - `GET /api/reservations`: Staff view of confirmed bookings.
- **Menu & Category CRUD**:
  - `GET /api/menu`: Filterable by category, search term, dietary preferences, and price/rating sorting.
  - `GET /api/categories`: Dynamic category counts based on current active inventory.
- **System Health Endpoint**:
  - `GET /api/health`: Live health metrics and store counters.

### 🎨 Frontend (`frontend/`)
- **React 19 + Vite 8**: Ultra-fast frontend running with an integrated Vite API proxy.
- **Live Backend Connection**: Dynamically pulls menu data and sends orders straight to the restaurant kitchen.
- **Interactive Dish Customization Modal**: Choose sides (Tortilla bread vs Grilled potatoes vs Fries), add-on toppings, and special chef cooking notes with live total calculations.
- **Interactive Shopping Cart Drawer**:
  - Delivery vs Takeaway switcher
  - Dynamic free delivery progress tracker (Free delivery over LKR 5,000)
  - Backend coupon code validation (`MITSI10`, `ARABIAN20`, `COLOMBO500`, `SWEETTOOTH`)
- **Multi-Channel Ordering & Checkout**:
  - 💳 **Online Payment Gateway**: Simulated 3D-Secure 256-Bit SSL bank authorization for Visa, Mastercard, Koko, Mintpay, LankaQR, and Cash on Delivery.
  - 📲 **Direct WhatsApp Order Generator**: Formats items, customizations, and customer details into a ready-to-send WhatsApp chat to the kitchen.
  - 🟢 **Uber Eats Direct Store Integration**: One-click link to order via the official Colombo 03 Uber Eats app.
- **Live Order Tracker Modal**: Enter any Order ID or tracking code to check cooking and dispatch stages in real-time.
- **Table Reservation Modal**: Interactive booking form for dine-in tables at Colombo 03.
- **Kitchen & Operations Dispatch Portal**: Staff interface to view incoming live orders, advance preparation stages, and review table bookings.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, CORS, Morgan, Dotenv, File-based JSON Database Engine
- **Frontend**: React 19, Vite 8, Lucide React, Canvas Confetti
- **Styling**: Vanilla CSS (Custom dark luxury design system, glassmorphism, responsive grid)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ganindu-ui/Mitsi-s-Delicious-.git
cd Mitsi-s-Delicious-
```

### 2. Start the Backend API
```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:5001
```

### 3. Start the Frontend Application
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5174
```

### 4. Build for Production
```bash
cd frontend
npm run build
```

---

## 📋 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System health and database counts |
| `GET` | `/api/restaurant` | Restaurant metadata, opening hours & delivery rules |
| `GET` | `/api/categories` | All menu categories with item counts |
| `GET` | `/api/menu` | Full menu (supports `category`, `search`, `filter`, `sortBy`) |
| `GET` | `/api/menu/:id` | Single dish details |
| `POST` | `/api/promos/validate` | Verify coupon code and calculate discount |
| `POST` | `/api/orders` | Place new order and queue in kitchen |
| `GET` | `/api/orders/:id` | Live status lookup by Order ID or tracking code |
| `PATCH`| `/api/orders/:id/status` | Update order stage (`preparing`, `on_the_way`, etc.) |
| `POST` | `/api/reservations` | Reserve a dining table |
| `GET` | `/api/reservations` | View table bookings |
| `GET` | `/api/reviews` | View guest reviews |
