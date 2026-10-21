import { db } from '../db/database.js';

export const getRestaurantInfo = (req, res) => {
  try {
    const info = db.getRestaurantInfo();
    res.json({
      success: true,
      data: info
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateRestaurantInfo = (req, res) => {
  try {
    const updated = db.updateRestaurantInfo(req.body);
    res.json({
      success: true,
      message: 'Restaurant information updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
