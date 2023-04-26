import {Router} from 'express';
import {addNewItem, getAllProducts, getFaultyProducts} from '../controllers/itemController';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post('/addNewItem', verifyToken ,addNewItem);
router.get('/getItems', getAllProducts);
router.get('/getFaultyProducts', getFaultyProducts)

export default router;