import { Schema, model, Types } from "mongoose";
import {IStudent} from '../interfaces/interfaces'

const StudentSchema = new Schema<IStudent>({
    FullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean,required: true },
    id: { type: String, required: true}
})

const Student = model<IStudent>('Teacher', StudentSchema);

export default Student;