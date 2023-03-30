import { Router } from "express";
import {LOGIN} from '../controllers/userController'

const router = Router();

router.post('/login', LOGIN)

// router.post('/addStudents', REGISTER)

export default router;
