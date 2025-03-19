import { Router } from 'express';
import { create } from '../controllers/contact.controller.js';
import authorize from '../middlewares/authorize.middleware.js';

const router = Router();

router.post('/create',authorize, create);

export default router;