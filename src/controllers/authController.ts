import { Request, Response } from 'express'
import User from '../models/User'
import { messages } from '../helper/messages';
import { useCreateSchema, userLoginSchema, useRregisterSchema } from '../validations/authValidation';

export const userRegister = async (req: Request, res: Response) => {
    const msg = messages.userRegister
    try {
        const { error, value } = useRregisterSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const { username, emailID, password } = value
        const isExist = await User.findOne({ emailID })
        if (isExist) throw new Error(messages.emailExists)

        const user = new User({ username, emailID, password, role: 'team_member' });
        const token = await user.generateAuthToken()
        await user.save();
        res.status(201).send({ code: 201, success: true, message: msg, data: { token, userID: user._id } })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}


export const userlogin = async (req: Request, res: Response) => {
    const msg: string = 'User Login successfully'
    try {
        const { error, value } = userLoginSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const { emailID, password } = value;
        const user = await User.findByCredentials(emailID, password);
        const token = await user.generateAuthToken()
        res.status(200).send({ code: 200, success: true, message: msg, data: { token, userID: user._id } });
    } catch (error: any) {
        res.status(400).send({ code: 200, success: false, message: error.message });
    }
};


export const createUser = async (req: Request, res: Response) => {
    const msg = messages.userCreated
    try {
        const { error, value } = useCreateSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const { username, emailID, password, role } = value
        const isExist = await User.findOne({ emailID })
        if (isExist) throw new Error(messages.emailExists)

        const user = new User({ username, emailID, password, role: role });
        await user.save();
        res.status(201).send({ code: 201, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}
