import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { IOrder, IStudent } from "../interfaces/interfaces";
import Order from "../models/Order";
import Reservation from "../models/Reservation";
import Student from "../models/Student";
import Item from "../models/Item";

const studentGetOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const today = new Date();

    const orders = await Order.find({ userId: userId });
    const reservation = await Reservation.find({ student: userId });
    const itemsIds = reservation.map((reserv) => reserv.item);
    const items = await Item.find({ _id: { $in: itemsIds } });
    //@ts-ignore
    const resWithItems = [];
    reservation.forEach((rsv) => {
      const itm = items.find((x) => x._id.toString() == rsv.item.toString());
      resWithItems.push({
        rsv: rsv,
        itm: itm,
      });
    });
    res
      .send({
        orders: orders,
        reservation: reservation,
        //@ts-ignore
        resWithItems: resWithItems,
      })
      .status(200);
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
        _id: orders[i]._id,
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
  const { userId, itemName, DateFrom, DateTo } = req.body.item;

  try {
    console.log(req.body);

    // find the available items.
    const reservations = await Reservation.find({
      $or: [
        { DateFrom: { $gte: DateFrom }, DateTo: { $lte: DateTo } },
        { DateFrom: { $lte: DateFrom }, DateTo: { $gte: DateTo } },
        { DateFrom: { $gte: DateFrom, $lte: DateTo } },
        { DateTo: { $gte: DateFrom, $lte: DateTo } },
      ],
    });
    const itemsIds = reservations.map((x) => x.item);
    const items = await Item.find({
      kind: itemName,
      _id: { $nin: itemsIds },
      condition: true,
    }).select("-subItems");

    // if there are an items available at the requested period
    // take the first one available and make new Reservation related to the student.
    if (items.length != 0) {
      const newReservation = new Reservation({
        student: new Types.ObjectId(userId),
        item: new Types.ObjectId(items[0]._id),
        DateFrom: new Date(DateFrom),
        DateTo: new Date(DateTo),
        status: true,
      });
      // save the new reservation in DB.
      await newReservation.save();

      // console.log(req.body.item._id);

      // delete the order
      await Order.findOneAndDelete({ _id: req.body.item._id });
    } else {
      // no available items
      throw "Pay Attention! there are no available items in this category!";
    }

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

const StudentReturnItem = async (req: Request, res: Response) => {
  const { itm, rsv } = req.body.itemToReturn;
  
  try {
    await Reservation.findByIdAndDelete({ _id: rsv._id });
    res.sendStatus(200);
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};

export {
  makeOrder,
  confirmOrder,
  enterToWaitingList,
  AdminGetOrders,
  studentGetOrders,
  StudentReturnItem,
};
