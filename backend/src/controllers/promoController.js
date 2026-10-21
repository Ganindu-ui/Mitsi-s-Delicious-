import { db } from '../db/database.js';

export const validatePromo = (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Promo code is required'
      });
    }

    const promo = db.findPromo(code);

    if (!promo) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid promo code. Try "MITSI10" for 10% off!'
      });
    }

    const currentSubtotal = Number(subtotal) || 0;

    if (promo.minOrder && currentSubtotal < promo.minOrder) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `This coupon requires a minimum subtotal of LKR ${promo.minOrder.toLocaleString()}.`
      });
    }

    let discountAmount = 0;
    if (promo.type === 'percentage') {
      discountAmount = Math.round((currentSubtotal * promo.discountPercent) / 100);
    } else if (promo.type === 'fixed') {
      discountAmount = Math.min(currentSubtotal, promo.discountAmount);
    }

    res.json({
      success: true,
      valid: true,
      data: {
        code: promo.code,
        description: promo.description,
        type: promo.type,
        discountPercent: promo.discountPercent || null,
        discountAmount,
        minOrder: promo.minOrder
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getPromos = (req, res) => {
  try {
    const promos = db.getPromos();
    res.json({
      success: true,
      data: promos
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
