import { Schema, model, Types } from 'mongoose';

export interface IUser {
    userName: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean,required: true },
})

const User = model<IUser>('User', UserSchema);

export default User;