import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  INITIAL_RESTAURANT_INFO,
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_PROMOS,
  INITIAL_REVIEWS,
  INITIAL_RESERVATIONS
} from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

class Database {
  constructor() {
    this.data = {
      restaurant: INITIAL_RESTAURANT_INFO,
      categories: INITIAL_CATEGORIES,
      menu: INITIAL_MENU_ITEMS,
      promos: INITIAL_PROMOS,
      orders: [],
      reservations: INITIAL_RESERVATIONS,
      reviews: INITIAL_REVIEWS
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        if (fileContent.trim()) {
          const parsed = JSON.parse(fileContent);
          this.data = {
            restaurant: parsed.restaurant || INITIAL_RESTAURANT_INFO,
            categories: parsed.categories || INITIAL_CATEGORIES,
            menu: parsed.menu || INITIAL_MENU_ITEMS,
            promos: parsed.promos || INITIAL_PROMOS,
            orders: parsed.orders || [],
            reservations: parsed.reservations || INITIAL_RESERVATIONS,
            reviews: parsed.reviews || INITIAL_REVIEWS
          };
          console.log(`[Database] Loaded persistent data from ${DB_FILE}`);
          return;
        }
      }

      // If no file exists, write initial data
      this.save();
      console.log(`[Database] Initialized new persistent store at ${DB_FILE}`);
    } catch (err) {
      console.error('[Database] Failed to initialize DB from file:', err);
    }
  }

  save() {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('[Database] Error persisting data to file:', err);
    }
  }

  // Restaurant
  getRestaurantInfo() {
    return this.data.restaurant;
  }

  updateRestaurantInfo(updates) {
    this.data.restaurant = { ...this.data.restaurant, ...updates };
    this.save();
    return this.data.restaurant;
  }

  // Categories
  getCategories() {
    // Recalculate counts dynamically
    const counts = {};
    this.data.menu.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return this.data.categories.map((cat) => {
      if (cat.id === 'all') {
        return { ...cat, count: this.data.menu.length };
      }
      if (cat.id === 'featured') {
        return { ...cat, count: this.data.menu.filter((m) => m.isFeatured).length };
      }
      return { ...cat, count: counts[cat.id] || 0 };
    });
  }

  // Menu Items
  getMenu({ category, search, filter, sortBy } = {}) {
    let items = [...this.data.menu];

    // Category filter
    if (category && category !== 'all') {
      if (category === 'featured') {
        items = items.filter((item) => item.isFeatured);
      } else {
        items = items.filter((item) => item.category === category);
      }
    }

    // Search query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Dietary / Badge filter
    if (filter && filter !== 'all') {
      if (filter === 'vegetarian') {
        items = items.filter((item) => item.dietary === 'vegetarian');
      } else if (filter === 'popular') {
        items = items.filter((item) => item.badge);
      } else if (filter === 'budget') {
        items = items.filter((item) => item.price <= 2500);
      }
    }

    // Sorting
    if (sortBy === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else {
      // featured first
      items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return items;
  }

  getMenuItem(id) {
    return this.data.menu.find((item) => item.id === id);
  }

  addMenuItem(item) {
    const newItem = {
      id: item.id || `dish-${Date.now()}`,
      isAvailable: true,
      rating: 5.0,
      ratingCount: 1,
      ...item
    };
    this.data.menu.push(newItem);
    this.save();
    return newItem;
  }

  updateMenuItem(id, updates) {
    const idx = this.data.menu.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    this.data.menu[idx] = { ...this.data.menu[idx], ...updates };
    this.save();
    return this.data.menu[idx];
  }

  deleteMenuItem(id) {
    const idx = this.data.menu.findIndex((item) => item.id === id);
    if (idx === -1) return false;
    this.data.menu.splice(idx, 1);
    this.save();
    return true;
  }

  // Promos
  getPromos() {
    return this.data.promos.filter((p) => p.isActive);
  }

  findPromo(code) {
    if (!code) return null;
    return (
      this.data.promos.find(
        (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.isActive
      ) || null
    );
  }

  // Orders
  getOrders({ phone, status, limit } = {}) {
    let orders = [...this.data.orders];

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      orders = orders.filter((o) => o.customer?.phone?.replace(/\D/g, '').includes(cleanPhone));
    }

    if (status) {
      orders = orders.filter((o) => o.status === status);
    }

    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (limit && Number(limit) > 0) {
      orders = orders.slice(0, Number(limit));
    }

    return orders;
  }

  getOrderById(idOrCode) {
    if (!idOrCode) return null;
    const target = idOrCode.trim().toUpperCase();
    return (
      this.data.orders.find(
        (o) =>
          o.orderId.toUpperCase() === target ||
          (o.trackingCode && o.trackingCode.toUpperCase() === target)
      ) || null
    );
  }

  createOrder(orderData) {
    const orderId =
      orderData.orderId || `MITSI-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingCode = `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newOrder = {
      orderId,
      trackingCode,
      customer: {
        name: orderData.customerName || orderData.customer?.name || 'Valued Guest',
        phone: orderData.phone || orderData.customer?.phone || '',
        email: orderData.email || orderData.customer?.email || '',
        address: orderData.address || orderData.customer?.address || '',
        deliveryNotes: orderData.deliveryNotes || orderData.customer?.deliveryNotes || '',
        orderType: orderData.orderType || 'delivery'
      },
      items: orderData.items || [],
      pricing: {
        subtotal: Number(orderData.subtotal) || 0,
        discountAmount: Number(orderData.discountAmount) || 0,
        promoCode: orderData.promoCode || null,
        deliveryFee: Number(orderData.deliveryFee) || 0,
        total: Number(orderData.total || orderData.grandTotal) || 0
      },
      payment: {
        method: (orderData.paymentMethod || 'COD').toUpperCase(),
        paidOnline: Boolean(orderData.paidOnline),
        status: orderData.paidOnline ? 'paid' : 'pending',
        transactionId: orderData.transactionId || null,
        paidAt: orderData.paidAt || (orderData.paidOnline ? new Date().toISOString() : null)
      },
      status: 'confirmed', // 'received' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered'
      statusHistory: [
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          message: 'Order received and confirmed by kitchen.'
        }
      ],
      estimatedTime: '30 - 45 mins',
      channel: orderData.via || 'Web Online',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(idOrCode, newStatus, message) {
    const order = this.getOrderById(idOrCode);
    if (!order) return null;

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      message: message || `Status updated to ${newStatus}`
    });

    this.save();
    return order;
  }

  // Reservations
  getReservations() {
    return [...this.data.reservations].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  createReservation(resData) {
    const reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: resData.guestName,
      phone: resData.phone,
      email: resData.email || '',
      date: resData.date,
      time: resData.time,
      partySize: Number(resData.partySize) || 2,
      occasion: resData.occasion || 'Casual Dining',
      specialRequests: resData.specialRequests || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.data.reservations.unshift(reservation);
    this.save();
    return reservation;
  }

  // Reviews
  getReviews() {
    return this.data.reviews;
  }

  addReview(reviewData) {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || 'Anonymous Guest',
      rating: Number(reviewData.rating) || 5,
      comment: reviewData.comment || '',
      dishId: reviewData.dishId || null,
      date: 'Just now',
      createdAt: new Date().toISOString()
    };
    this.data.reviews.unshift(newRev);
    this.save();
    return newRev;
  }
}

export const db = new Database();
