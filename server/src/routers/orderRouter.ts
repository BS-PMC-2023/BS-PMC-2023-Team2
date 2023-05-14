import { Router } from 'express';
import {makeOrder, confirmOrder, enterToWaitingList, AdminGetOrders, studentGetOrders} from '../controllers/orderController'
import verifyToken from '../middleware/verifyToken'


const router = Router();

router.post('/makeOrder', verifyToken, makeOrder)
router.post('/confirmOrder', verifyToken, confirmOrder)
router.post('/enterToWaitingList', verifyToken, enterToWaitingList)
router.get('/AdminGetOrders', AdminGetOrders)
router.get('/studentGetOrders', verifyToken ,studentGetOrders)


export default router;