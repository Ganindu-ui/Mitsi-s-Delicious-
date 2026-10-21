import { Router } from 'express';
import { validatePromo, getPromos } from '../controllers/promoController.js';

const router = Router();

router.post('/validate', validatePromo);
router.get('/', getPromos);

export default router;
