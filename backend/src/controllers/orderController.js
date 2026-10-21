import { db } from '../db/database.js';

export const createOrder = (req, res) => {
  try {
    const { items, customer, customerName, phone, address, total, orderType } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    const order = db.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: 'Order created successfully and queued in kitchen',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getOrders = (req, res) => {
  try {
    const { phone, status, limit } = req.query;
    const orders = db.getOrders({ phone, status, limit });
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getOrderById = (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order found with ID or tracking code "${req.params.id}"`
      });
    }
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateOrderStatus = (req, res) => {
  try {
    const { status, message } = req.body;
    const validStatuses = ['received', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = db.updateOrderStatus(req.params.id, status, message);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: `Order status updated to "${status}"`,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
