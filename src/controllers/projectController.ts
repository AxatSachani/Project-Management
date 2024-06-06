import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { messages } from "../helper/messages";
import Project from "../models/Project";
import Task from "../models/Task";
import { projectCreateSchema, projectDeleteSchema, projectUpdateSchema } from "../validations/projectValidation";

//create a new project
export const createProject = async (req: Request, res: Response) => {
    const msg = messages.projectCreated
    try {
        const { error, value } = projectCreateSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const { title, description, startDate, endDate } = value

        const isExist = await Project.findOne({ title })
        if (isExist) throw new Error(messages.projectDuplicate)

        const newProject = new Project({ title, description, startDate, endDate })
        await newProject.save()

        res.status(201).send({ code: 201, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}

// get all projects details
export const getProjects = async (req: Request, res: Response) => {
    const msg = messages.projectDetails
    try {
        const projects = await Project.find().select({ _id: 1, title: 1, startDate: 1, endDate: 1, createdAt: 1 });
        res.status(200).send({ code: 200, success: true, message: msg, data: { projects } })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
};


// get project details by projectID
export const getProjectByID = async (req: Request, res: Response) => {
    const msg = messages.projectDetails
    try {
        const { projectID } = req.params
        const project = await Project.aggregate([
            {
                $match: { _id: new ObjectId(projectID) }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'projectID',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                iscompleted: 1,
                                priority: 1,
                                dueDate: 1,
                                createdAt: 1,
                            }
                        }
                    ],
                    as: 'tasks'
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    startDate: 1,
                    endDate: 1,
                    createdAt: 1,
                    tasks: 1
                }
            }
        ])
        res.status(200).send({ code: 200, success: true, message: msg, data: { project } })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}


// update a project
export const updateProject = async (req: Request, res: Response) => {
    const msg = messages.projectUpdated
    try {
        const { projectID } = req.params

        const { error, value } = projectUpdateSchema.validate({ ...req.body, projectID })
        if (error) throw new Error(error.message)

        const { title, description, startDate, endDate } = value

        const project = await Project.findById(projectID)
        if (!project) throw new Error(messages.projectNotFound)

        if (project.title !== title) {
            const isExist = await Project.findOne({ title })
            if (isExist) throw new Error(messages.projectDuplicate)
        }

        project.title = title
        project.description = description
        project.startDate = startDate
        project.endDate = endDate
        await project.save()
        res.status(200).send({ code: 200, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}


// delete project, also delete all task which is associated with project
export const deleteProject = async (req: Request, res: Response) => {
    const msg = messages.projectDeleted
    try {
        const { error, value } = projectDeleteSchema.validate(req.params)
        if (error) throw new Error(error.message)

        const { projectID } = value
        const project = await Project.findByIdAndDelete(projectID)
        if (!project) throw new Error(messages.projectNotFound)

        await Task.deleteMany({ projectID })

        res.status(200).send({ code: 200, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }

}