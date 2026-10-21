import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { db } from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Root Health & Metadata Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    restaurant: "Mitsi's Delicacies by Arabian Vibes",
    location: 'Colombo 03, Sri Lanka',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      menu: '/api/menu',
      categories: '/api/menu/categories',
      orders: '/api/orders',
      promos: '/api/promos',
      restaurant: '/api/restaurant',
      reservations: '/api/reservations',
      reviews: '/api/reviews'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    restaurant: "Mitsi's Delicacies by Arabian Vibes",
    counts: {
      menuItems: db.getMenu().length,
      orders: db.getOrders().length,
      reservations: db.getReservations().length,
      reviews: db.getReviews().length
    }
  });
});

// Mount Routes
app.use('/api/menu', menuRoutes);
app.use('/api/categories', (req, res) => {
  res.json({ success: true, data: db.getCategories() });
});
app.use('/api/orders', orderRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Mitsi's Delicacies Backend running on port ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}`);
  console.log(`🥗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Menu API: http://localhost:${PORT}/api/menu`);
  console.log(`======================================================\n`);
});

export default app;
