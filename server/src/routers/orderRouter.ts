import { Router } from 'express';
import {makeOrder, confirmOrder} from '../controllers/orderController'
import verifyToken from '../middleware/verifyToken'


const router = Router();

router.post('/makeOrder', verifyToken, makeOrder)
router.post('/confirmOrder', verifyToken, confirmOrder)


export default router;