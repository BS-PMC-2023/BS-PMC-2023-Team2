import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Order from "../models/Order";

const makeOrder = async (req: Request, res: Response) => {
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



export { makeOrder };
