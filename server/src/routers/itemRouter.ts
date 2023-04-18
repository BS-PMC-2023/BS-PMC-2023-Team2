import {Router} from 'express';
import {addNewItem, getAllProducts} from '../controllers/itemController';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post('/addNewItem', verifyToken ,addNewItem);
router.get('/getItems', getAllProducts);

export default router;