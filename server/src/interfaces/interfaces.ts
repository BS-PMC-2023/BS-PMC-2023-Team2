export interface IPerson  {
    FullName: string,
    id: string,
    phone: string,
    email: string,
    password: string,
    isAdmin: boolean
}

export interface IStudent extends IPerson {
    sceEmail:string,
    year: number,
    priority: number
}

export interface ITeacher extends IPerson {
    course: string
}