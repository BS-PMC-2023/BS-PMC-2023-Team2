import { Schema, model, Types } from "mongoose";
import {IItem} from '../interfaces/interfaces'

const ItemSchema = new Schema<IItem>({
    serialNumber: {type: String, required: true, unique: true},
    itemName: {type: String, required: true},
    condition: {type: Boolean, required: true},
    kind: {type: String, required: true},
    subItems: {type: [Types.ObjectId], ref: 'SubItem', required: false}
})

const Item = model<IItem>('Item', ItemSchema);

export default Item;