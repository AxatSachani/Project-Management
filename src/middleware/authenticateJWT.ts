import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { messages } from "../helper/messages";

const JWT_SECRET: string = process.env.JWT_SECRET!

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    let code: number = 400
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            code = 401
            throw new Error(messages.accessDenied)
        }
        const verified = jwt.verify(token, JWT_SECRET) as { userID: string, role: string };
        req.user = verified;
        next();
    } catch (error: any) {
        res.status(code).send({ code: code, success: false, message: error.message });
    }
};

export { authenticateJWT };