// Frontend API Client for Mitsi's Delicacies Backend
const API_BASE = '/api';

/**
 * Helper to make API requests with json parsing and error handling
 */
async function request(endpoint, options = {}) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (err) {
    console.warn(`[API] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // System Health
  getHealth: () => request('/health'),

  // Restaurant Info
  getRestaurantInfo: () => request('/restaurant'),

  // Menu & Categories
  getMenu: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.set('category', params.category);
    if (params.search) query.set('search', params.search);
    if (params.filter && params.filter !== 'all') query.set('filter', params.filter);
    if (params.sortBy) query.set('sortBy', params.sortBy);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/menu${queryString}`);
  },

  getMenuItem: (id) => request(`/menu/${id}`),

  getCategories: () => request('/categories'),

  // Promo Codes
  validatePromo: (code, subtotal) =>
    request('/promos/validate', {
      method: 'POST',
      body: { code, subtotal }
    }),

  getPromos: () => request('/promos'),

  // Orders
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: orderData
    }),

  getOrder: (idOrCode) => request(`/orders/${encodeURIComponent(idOrCode)}`),

  getOrders: (params = {}) => {
    const query = new URLSearchParams();
    if (params.phone) query.set('phone', params.phone);
    if (params.status) query.set('status', params.status);
    if (params.limit) query.set('limit', params.limit);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/orders${queryString}`);
  },

  updateOrderStatus: (idOrCode, status, message) =>
    request(`/orders/${encodeURIComponent(idOrCode)}/status`, {
      method: 'PATCH',
      body: { status, message }
    }),

  // Table Reservations
  createReservation: (resData) =>
    request('/reservations', {
      method: 'POST',
      body: resData
    }),

  getReservations: () => request('/reservations'),

  // Reviews
  getReviews: () => request('/reviews'),

  createReview: (reviewData) =>
    request('/reviews', {
      method: 'POST',
      body: reviewData
    })
};

export default api;
