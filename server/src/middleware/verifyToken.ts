import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['token'];
    
    try{
        if(token){
            //@ts-ignore
            const jwtRes = jwt.verify(token, process.env.secretKey)

            //@ts-ignore
            req.body.userId = jwtRes._id;
            next();
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

export default verifyToken;