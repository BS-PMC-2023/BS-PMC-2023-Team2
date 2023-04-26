import { Router } from 'express';
import {makeOrder, confirmOrder, enterToWaitingList} from '../controllers/orderController'
import verifyToken from '../middleware/verifyToken'


const router = Router();

router.post('/makeOrder', verifyToken, makeOrder)
router.post('/confirmOrder', verifyToken, confirmOrder)
router.post('/enterToWaitingList', verifyToken, enterToWaitingList)


export default router;