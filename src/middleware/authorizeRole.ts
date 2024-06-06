import { Response, NextFunction, Request } from "express";

const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!roles.includes(req.user?.role)) {
                throw new Error('Access Denied');
            }
            next();
        } catch (error: any) {
            res.status(403).send({ code: 403, success: false, message: error.message });
        }
    };
};

export { authorizeRole };