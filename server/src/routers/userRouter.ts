import { Router } from "express";
import {LOGIN, getPass} from '../controllers/userController'

const router = Router();

router.post('/login', LOGIN)

// router.post('/addStudents', REGISTER)

router.post('/getPass', getPass)

export default router;
