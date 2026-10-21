import { db } from '../db/database.js';

export const getReviews = (req, res) => {
  try {
    const reviews = db.getReviews();
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createReview = (req, res) => {
  try {
    const { author, rating, comment } = req.body;

    if (!author || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Author name and rating are required.'
      });
    }

    const review = db.addReview(req.body);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
