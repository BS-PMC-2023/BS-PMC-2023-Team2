import { Request, Response } from "express";
import Item from "../models/Item";

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

const getAllProducts =async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.send(items)
  } catch (error) {
    res.sendStatus(404)
  }
}

export {addNewItem, getAllProducts}
