import { db } from '../db/database.js';

export const createReservation = (req, res) => {
  try {
    const { guestName, phone, date, time, partySize } = req.body;

    if (!guestName || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, date, and time are required for table reservation.'
      });
    }

    const reservation = db.createReservation(req.body);

    res.status(201).json({
      success: true,
      message: 'Table reservation placed and confirmed!',
      data: reservation
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getReservations = (req, res) => {
  try {
    const reservations = db.getReservations();
    res.json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
