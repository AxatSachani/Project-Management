import { Schema, model, Document } from "mongoose"
import { IProject } from "../types"

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: { currentTime: () => new Date(), } })

const Project = model<IProject>('Project', projectSchema)

export default Project