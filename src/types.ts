import { Document, Model, Types } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user: {
                userID: string;
                role: string;
            };
        }
    }
}

export interface IUser extends Document {
    username: string;
    emailID: string;
    password: string;
    role: 'admin' | 'project_manager' | 'team_member';
    token: string;
    createdAt: Date;
    updatedAt: Date;
    generateAuthToken(): Promise<string>
}

export interface IUserModel extends Model<IUser> {
    findByCredentials(username: string, password: string): Promise<IUser>
}

export interface IProject extends Document {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date
}

export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    iscompleted: boolean;
    projectID: Types.ObjectId;
    userID: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date
}
