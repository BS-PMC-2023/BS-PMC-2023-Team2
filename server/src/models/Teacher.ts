import { Schema, model, Types } from "mongoose";
import {ITeacher} from '../interfaces/interfaces'

const TeacherSchema = new Schema<ITeacher>({
    FullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean,required: true },
    id: { type: String, required: true},
    course: { type: String, required: true}
})

const Teacher = model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;