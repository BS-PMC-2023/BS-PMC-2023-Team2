import { Router } from 'express';
import {makeOrder} from '../controllers/orderController'
import verifyToken from '../middleware/verifyToken'

const router = Router();

router.post('/makeOrder', verifyToken, makeOrder)

export default router;