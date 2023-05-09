import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { IOrder, IStudent } from "../interfaces/interfaces";
import Order from "../models/Order";
import Reservation from "../models/Reservation";
import Student from "../models/Student";

const studentGetOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const today = new Date();

    const orders = await Order.find({ userId: userId });
    const reservation = await Reservation.find({ student: userId });

    console.log(orders);
    console.log(reservation);
    res.sendStatus(200);
  } catch (error: any) {
    console.log(error.message);
    res.send(404);
  }
};

const AdminGetOrders = async (req: Request, res: Response) => {
  interface str extends IOrder {
    student: IStudent | undefined;
  }
  try {
    const orders = await Order.find();
    const userIds = orders.map((o) => o.userId);
    const users = await Student.find({ _id: { $in: userIds } }).select(
      "-password"
    );
    let ordersToRet = <str[]>[];

    for (let i = 0; i < orders.length; i++) {
      const theUser: IStudent | undefined = users.find(
        (us) => us._id.toString() == orders[i].userId.toString()
      );
      let a: str = {
        //@ts-ignore
        _id: orders[i]._Id,
        itemName: orders[i].itemName,
        DateFrom: orders[i].DateFrom,
        DateTo: orders[i].DateTo,
        userId: orders[i].userId,
        status: orders[i].status,
        student: theUser,
      };
      ordersToRet.push(a);
    }
    res.send(ordersToRet).status(200);
  } catch (error) {
    res.sendStatus(404);
  }
};

const makeOrder = async (req: Request, res: Response) => {
  const { itemName, DateFrom, DateTo } = req.body.obj;

  try {
    
    const newOrder = new Order({
      userId: new Types.ObjectId(req.body.userId),
      itemName: itemName,
      DateFrom: new Date(DateFrom),
      DateTo: new Date(DateTo),
      status: 0,
    });
    // console.log(newOrder);

    await newOrder.save();

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

const confirmOrder = async (req: Request, res: Response) => {
  const { studentId, itemId, DateFrom, DateTo } = req.body;

  try {
    const newReservation = new Reservation({
      student: new Types.ObjectId(studentId),
      item: new Types.ObjectId(itemId),
      DateFrom: new Date(DateFrom),
      DateTo: new Date(DateTo),
      status: false,
    });

    await newReservation.save();

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

const enterToWaitingList = async (req: Request, res: Response) => {
  const { userId, itemName, DateFrom, DateTo } = req.body;

  try {
    const newOrder = new Order({
      userId: new Types.ObjectId(userId),
      itemName: itemName,
      DateFrom: new Date(DateFrom),
      DateTo: new Date(DateTo),
      status: 0,
    });

    await newOrder.save();

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

export { makeOrder, confirmOrder, enterToWaitingList, AdminGetOrders, studentGetOrders };
