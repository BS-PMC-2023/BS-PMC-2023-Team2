import { Schema, model, Types } from "mongoose";
import {IStudent} from '../interfaces/interfaces'

const StudentSchema = new Schema<IStudent>({
    FullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean,required: true },
    id: { type: String, required: true, unique: true},
    sceName: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    priority: { type: Number, required: true }
})

const Student = model<IStudent>('Student', StudentSchema);

export default Student;