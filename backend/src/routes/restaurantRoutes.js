import { Router } from 'express';
import { getRestaurantInfo, updateRestaurantInfo } from '../controllers/restaurantController.js';

const router = Router();

router.get('/', getRestaurantInfo);
router.put('/', updateRestaurantInfo);

export default router;
