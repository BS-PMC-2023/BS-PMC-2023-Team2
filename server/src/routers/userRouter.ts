import { Router } from "express";
import {LOGIN, getPass, addStudentsByExcel, sendEmailToAdmin} from '../controllers/userController'

const router = Router();

router.post('/login', LOGIN)

router.post('/addStudents', addStudentsByExcel)

router.post('/getPass', getPass)

router.post('/sendEmail', sendEmailToAdmin)

export default router;
