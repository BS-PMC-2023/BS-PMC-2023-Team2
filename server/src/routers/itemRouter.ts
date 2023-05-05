import {Router} from 'express';
import {addNewItem, getAllProducts, getFaultyProducts, getAvailableItems} from '../controllers/itemController';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post('/addNewItem', verifyToken ,addNewItem);
router.get('/getItems', getAllProducts);
router.get('/getFaultyProducts', getFaultyProducts);
router.get('/getAvailableItems', getAvailableItems);

export default router;