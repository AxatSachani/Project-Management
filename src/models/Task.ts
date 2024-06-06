import { Schema, model } from "mongoose";
import { ITask } from "../types";

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iscompleted: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true },
    projectID: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    userID: { type: [Schema.Types.ObjectId], ref: 'User', required: true, index: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: { currentTime: () => new Date() } });

const Task = model<ITask>('Task', taskSchema)

export default Task