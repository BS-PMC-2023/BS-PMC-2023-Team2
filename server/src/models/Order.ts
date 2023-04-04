import { Schema, model, Types } from "mongoose";
import {IOrder} from '../interfaces/interfaces'

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    itemName: {type: String, required: true},
    DateFrom: {type: Date, required: true},
    DateTo: {type: Date, required: true},
    status: {type: Number, required: true}
})

const Order = model<IOrder>('Order', OrderSchema);

export default Order;