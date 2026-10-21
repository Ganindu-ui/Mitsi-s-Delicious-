import { db } from '../db/database.js';

export const getMenuItems = (req, res) => {
  try {
    const { category, search, filter, sortBy } = req.query;
    const items = db.getMenu({ category, search, filter, sortBy });
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getMenuItemById = (req, res) => {
  try {
    const item = db.getMenuItem(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCategories = (req, res) => {
  try {
    const categories = db.getCategories();
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createMenuItem = (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      });
    }

    const newItem = db.addMenuItem(req.body);
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: newItem
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMenuItem = (req, res) => {
  try {
    const updated = db.updateMenuItem(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({
      success: true,
      message: 'Menu item updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteMenuItem = (req, res) => {
  try {
    const deleted = db.deleteMenuItem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
