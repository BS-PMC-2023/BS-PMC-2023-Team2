import { Schema, model, Types } from "mongoose";
import {IReservation} from '../interfaces/interfaces'

const ReservationSchema = new Schema<IReservation>({
    student: {type: Types.ObjectId, ref: 'Student'},
    item: {type: Types.ObjectId, ref: 'Item'},
    DateFrom: {type: Date, required: true},
    DateTo: {type: Date, required: true},
    status: {type: Boolean, required: true}
})

const Reservation = model<IReservation>('Reservation', ReservationSchema);

export default Reservation;