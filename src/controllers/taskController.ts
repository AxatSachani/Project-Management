import { Request, Response } from "express";
import { messages } from "../helper/messages";
import Project from "../models/Project";
import Task from "../models/Task";
import { commanSchema, taskCreateSchema, taskUpdateSchema } from "../validations/taskValidation";

// create a new task for a project
export const createTask = async (req: Request, res: Response) => {
    const msg = messages.taskCreated
    try {
        const { error, value } = taskCreateSchema.validate({ ...req.body, ...req.params })
        if (error) throw new Error(error.message)

        const { title, description, iscompleted, dueDate, priority, projectID, userID } = value
        const project = await Project.findById(projectID)
        if (!project) throw new Error(messages.projectNotFound)

        const isExist = await Task.findOne({ projectID, title })
        if (isExist) throw new Error(messages.taskDuplicate)

        const newTask = new Task({ title, description, iscompleted, dueDate, priority, projectID, userID })

        await newTask.save()

        res.status(201).send({ code: 201, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}


// get task by projectId
export const getTasksByProject = async (req: Request, res: Response) => {
    const msg = messages.taskList
    try {
        const { error, value } = commanSchema.validate(req.params)
        if (error) throw new Error(error.message)

        const { projectID } = value
        const tasks = await Task.find({ projectID }).select({ _id: 1, title: 1, iscompleted: 1, dueDate: 1, priority: 1, createdAt: 1, updatedAt: 1 })

        res.status(200).send({ code: 200, success: true, message: msg, data: { tasks } })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}

// get task by project & task ID
export const getTaskByID = async (req: Request, res: Response) => {
    const msg = messages.taskDetails
    try {
        const { error, value } = commanSchema.validate(req.params)
        if (error) throw new Error(error.message)

        const { projectID, taskID } = value

        const task = await Task.findOne({ _id: taskID, projectID }).populate({
            path: 'userID',
            select: { _id: 1, username: 1, emailID: 1 }
        }).select({ _id: 1, title: 1, description: 1, iscompleted: 1, dueDate: 1, priority: 1, createdAt: 1, updatedAt: 1 })

        res.status(200).send({ code: 200, success: true, message: msg, data: { task } })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
}

// update task details
export const updateTask = async (req: Request, res: Response) => {
    const msg = messages.taskUpdated
    try {
        const { error, value } = taskUpdateSchema.validate({ ...req.body, ...req.params })
        if (error) throw new Error(error.message)

        const { projectID, taskID, title, description, iscompleted, dueDate, priority, userID } = value

        const task = await Task.findOne({ _id: taskID, projectID })
        if (!task) throw new Error(messages.taskNotFound)

        if (task.title !== title) {
            const isExist = await Task.findOne({ projectID, title })
            if (isExist) throw new Error(messages.taskDuplicate)
        }

        task.title = title
        task.description = description
        task.iscompleted = iscompleted
        task.dueDate = dueDate
        task.priority = priority
        task.userID = userID

        await task.save()
        res.status(200).send({ code: 200, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
};

// delete task by ID
export const deleteTask = async (req: Request, res: Response) => {
    const msg = messages.taskDeleted
    try {
        const { error, value } = commanSchema.validate(req.params)
        if (error) throw new Error(error.message)

        const { projectID, taskID } = value

        const task = await Task.findOneAndDelete({ _id: taskID, projectID });
        if (!task) throw new Error(messages.taskNotFound);

        res.status(200).send({ code: 200, success: true, message: msg })
    } catch (error: any) {
        res.status(400).send({ code: 400, success: false, error: error.message })
    }
};