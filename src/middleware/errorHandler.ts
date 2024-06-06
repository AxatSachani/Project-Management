import { Request, Response, NextFunction } from 'express'

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ code: 500, success: false, error: error.message })
}

export { errorHandler }