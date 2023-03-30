import { Schema, model, Types } from "mongoose";
import {IAdmin} from '../interfaces/interfaces'

const AdminSchema = new Schema<IAdmin>({
    FullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean,required: true },
    id: { type: String, required: true, unique: true},
    sceName: { type: String, required: true, unique: true}
})

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;