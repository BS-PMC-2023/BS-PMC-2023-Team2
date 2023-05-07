import { Request, Response } from "express";
import Item from "../models/Item";
import Reservation from "../models/Reservation";
import { IReservation } from "../interfaces/interfaces";

const addNewItem = async (req: Request, res: Response) => {
  try {
    const { serialNumber, itemName, condition, kind } = req.body.product;

    const newItem = new Item({
      serialNumber: serialNumber,
      itemName: itemName,
      kind: kind,
      condition: condition,
    });

    await newItem.save();

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.sendStatus(404);
  }
};

const getFaultyProducts = async (req: Request, res: Response) => {
  try {
    const FaultyProducts = await Item.find({ condition: false });

    res.send({ FaultyProducts: FaultyProducts }).status(200);
  } catch (error) {
    res.sendStatus(404);
  }
};

const getAvailableItems = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { type, fromDate, toDate } = req.query.product;
    
    const reservations = await Reservation.find({
      $or: [
        { DateFrom: { $gte: fromDate }, DateTo: { $lte: toDate } },
        { DateFrom: { $lte: fromDate }, DateTo: { $gte: toDate } },
        { DateFrom: { $gte: fromDate, $lte: toDate } },
        { DateTo: { $gte: fromDate, $lte: toDate } },
      ],
    })
    const itemsIds = reservations.map(x => x.item )

    const items = await Item.find({kind: type, _id: {$nin: itemsIds}, condition: true}).select('-subItems')

    res.send({items}).status(200);
  } catch (error: any) {
    console.log(error.message);
    res.sendStatus(404);
  }
};

export { addNewItem, getAllProducts, getFaultyProducts, getAvailableItems };
