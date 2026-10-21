import { Router } from 'express';
import {
  getMenuItems,
  getMenuItemById,
  getCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';

const router = Router();

router.get('/', getMenuItems);
router.get('/categories', getCategories);
router.get('/:id', getMenuItemById);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
