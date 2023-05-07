import { Router } from "express";
import {LOGIN, getPass, addStudentsByExcel} from '../controllers/userController'

const router = Router();

router.post('/login', LOGIN)

router.post('/addStudents', addStudentsByExcel)

router.post('/getPass', getPass)

export default router;
