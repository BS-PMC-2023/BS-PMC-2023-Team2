import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";

const makeOrder = async (req: Request, res: Response) => {
    const { userId, itemName, DateFrom, DateTo } = req.body;

    

    res.send(req.body)
}

export {makeOrder}
