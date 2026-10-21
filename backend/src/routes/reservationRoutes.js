import { Router } from 'express';
import { createReservation, getReservations } from '../controllers/reservationController.js';

const router = Router();

router.post('/', createReservation);
router.get('/', getReservations);

export default router;
