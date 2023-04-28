import { Types } from 'mongoose';

export interface IPerson  {
    FullName: string,
    id: string,
    phone: string,
    email: string,
    password: string,
    isAdmin: boolean
}

export interface IStudent extends IPerson {
    sceName:string,
    year: number,
    priority: number
}

export interface ITeacher extends IPerson {
    sceName:string,
    course: string
}

export interface IAdmin extends IPerson {
    sceName: string  
}

export interface IItem {
    serialNumber: string,
    itemName: string,
    condition: boolean, // true: works well, false: broken 
    subItems: ISubItem[]
}

export interface ISubItem {
    serialNumber: string,
    itemName: string,
    condition: boolean, // true: works well, false: broken 
    connected: Types.ObjectId
}

export interface IOrder {
    userId: Types.ObjectId,
    itemName: string,
    DateFrom: Date,
    DateTo: Date,
    status: number // 0: pending, 1: accept, 2: reject
}

export interface IReservation {
    student: IStudent,
    item: IItem,
    DateFrom: Date,
    DateTo: Date,
    status: boolean // true: delivered, false: returned
}