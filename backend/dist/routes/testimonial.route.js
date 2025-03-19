import { Router } from 'express';
import { create, get } from '../controllers/testimonial.controller.js';
import authorize from '../middlewares/authorize.middleware.js';
const router = Router();
router.post('/create', authorize, create);
router.get('/get', get);
export default router;
