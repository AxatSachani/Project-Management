import { Schema, model } from "mongoose";
import config from '../config';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser, IUserModel } from "../types";
import { messages } from "../helper/messages";


const JWT_SECRET: string = config.JWT_SECRET

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    emailID: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: { currentTime: () => new Date() } });

// convert password into a hash before storing into the db
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

// verify credential for login
userSchema.statics.findByCredentials = async function (emailID: string, password: string) {
    const user = await this.findOne({ emailID });
    if (!user) throw new Error(messages.invalidCredentials)
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) throw new Error(messages.invalidCredentials)
    return user
}

// generate token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ userID: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    user.token = token
    await user.save()
    return token
}

const User = model<IUser, IUserModel>('User', userSchema);


export default User;