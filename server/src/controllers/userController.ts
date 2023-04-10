import { Request, Response, NextFunction } from "express";
import Admin from "../models/Admin";
import Student from "../models/Student";
import Teacher from '../models/Teacher';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IStudent } from "../interfaces/interfaces";

const LOGIN = async (req: Request, res: Response, next: NextFunction) => {
  const admin = await Admin.findOne({ sceName: req.body.sceName });
  if (!admin) {
    //not admin
    const student = await Student.findOne({ sceName: req.body.sceName });
    if (!student) {
      //not student
      const teacher = await Teacher.findOne({ sceName: req.body.sceName });
      if (!teacher) {
        //not teacher
        res.status(404).send("no user");
      } else {
        //teacher
        const comparePassword = await bcrypt.compare(
            req.body.password.toString(),
            teacher.password
          );
          if (!comparePassword) {
            res.status(404).send("invalid password!");
          } else {
            jwt.sign(
              { _id: teacher._id , kind: "TEACHER"},
              process.env.secretKey || "",
              { expiresIn: "7 days" },
              (err, token) => {
                if (err) {
                  res.sendStatus(403);
                } else {
                  res.json({ token: token, user: teacher }).sendStatus(200);
                }
              }
            );
          }

      }
    } else {
      //student
      const comparePassword = await bcrypt.compare(
        req.body.password.toString(),
        student.password
      );
      if (!comparePassword) {
        res.status(404).send("invalid password!");
      } else {
        jwt.sign(
          { _id: student._id , kind: "STUDENT"},
          process.env.secretKey || "",
          { expiresIn: "7 days" },
          (err, token) => {
            if (err) {
              res.sendStatus(403);
            } else {
              res.json({ token: token, user: student }).sendStatus(200);
            }
          }
        );
      }
    }
  } else {
    //admin

    const comparePassword = await bcrypt.compare(
      req.body.password.toString(),
      admin.password
    );
    if (!comparePassword) {
      res.status(404).send("invalid password!");
    } else {
      jwt.sign(
        { _id: admin._id, kind: "ADMIN" },
        process.env.secretKey || "",
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.json({ token: token, user: admin }).sendStatus(200);
          }
        }
      );
    }
  }
};

const getPass = async (req: Request, res: Response) => {
    const pass = await bcrypt.hash(req.body.pass.toString(), 10);
    res.send(pass)
}

const addStudentsByExcel = async (req: Request, res: Response) => {
  try {
    const students = req.body.students;

    if(!students){
      throw new Error("error occurs");
    }

    let arrayStudent: IStudent[] = []
    //@ts-ignore
    for(let element:IStudent of students)  {
    // students.forEach((element: IStudent) => {
      element.password = element.id;
      element.isAdmin = false;
      element.priority = 2;

      const student = new Student(element);
      await student.save();
    };
    res.send(arrayStudent).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export { LOGIN, getPass, addStudentsByExcel };
