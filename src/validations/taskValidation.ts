import Joi from 'joi';

export const taskCreateSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'Title should be a string',
            'string.empty': 'Title is required',
            'string.min': 'Title should have a minimum length of {#limit}',
            'string.max': 'Title should have a maximum length of {#limit}',
            'any.required': 'Title is required',
        }),
    description: Joi.string()
        .trim()
        .min(10)
        .max(255)
        .required()
        .messages({
            'string.base': 'Description should be a string',
            'string.empty': 'Description is required',
            'string.min': 'Description should have a minimum length of {#limit}',
            'string.max': 'Description should have a maximum length of {#limit}',
            'any.required': 'Description is required',
        }),
    iscompleted: Joi.boolean()
        .messages({
            'boolean.base': 'iscompleted should be a True or False',
            'any.required': 'iscompleted is required',
        }),
    dueDate: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Due Date should be a valid date',
            'date.format': 'Due Date should be in ISO date format',
            'any.required': 'Due Date is required',
        }),
    priority: Joi.string()
        .valid('low', 'medium', 'high')
        .required()
        .messages({
            'any.only': 'Priority should be one of "low", "medium", or "high"',
            'any.required': 'Priority is required',
        }),
    projectID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'Project ID should be a hexadecimal string',
            'string.length': 'Project ID should be 24 characters long',
            'any.required': 'Project ID is required',
        }),
    userID: Joi.array()
        .items(Joi.string().hex().length(24))
        .min(1)
        .required()
        .messages({
            'array.base': 'User ID should be an array',
            'array.min': 'At least one User ID is required',
            'string.hex': 'User ID should be a hexadecimal string',
            'string.length': 'User ID should be 24 characters long',
            'any.required': 'User ID is required',
        }),
});


export const taskUpdateSchema = Joi.object({
    projectID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'Project ID should be a hexadecimal string',
            'string.length': 'Project ID should be 24 characters long',
            'any.required': 'Project ID is required',
        }),
    taskID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'Task ID should be a hexadecimal string',
            'string.length': 'Task ID should be 24 characters long',
            'any.required': 'Task ID is required',
        }),
    title: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'Title should be a string',
            'string.empty': 'Title is required',
            'string.min': 'Title should have a minimum length of {#limit}',
            'string.max': 'Title should have a maximum length of {#limit}',
            'any.required': 'Title is required',
        }),
    description: Joi.string()
        .trim()
        .min(10)
        .max(255)
        .required()
        .messages({
            'string.base': 'Description should be a string',
            'string.empty': 'Description is required',
            'string.min': 'Description should have a minimum length of {#limit}',
            'string.max': 'Description should have a maximum length of {#limit}',
            'any.required': 'Description is required',
        }),
    iscompleted: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'iscompleted should be a True or False',
            'any.required': 'iscompleted is required',
        }),
    dueDate: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Due Date should be a valid date',
            'date.format': 'Due Date should be in ISO date format',
            'any.required': 'Due Date is required',
        }),
    priority: Joi.string()
        .valid('low', 'medium', 'high')
        .required()
        .messages({
            'any.only': 'Priority should be one of "low", "medium", or "high"',
            'any.required': 'Priority is required',
        }),
    userID: Joi.array()
        .items(Joi.string().hex().length(24))
        .min(1)
        .required()
        .messages({
            'array.base': 'User ID should be an array',
            'array.min': 'At least one User ID is required',
            'string.hex': 'User ID should be a hexadecimal string',
            'string.length': 'User ID should be 24 characters long',
            'any.required': 'User ID is required',
        }),
});


export const commanSchema = Joi.object({
    projectID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'Project ID should be a hexadecimal string',
            'string.length': 'Project ID should be 24 characters long',
            'any.required': 'Project ID is required',
        }),
    taskID: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'Task ID should be a hexadecimal string',
            'string.length': 'Task ID should be 24 characters long',
            'any.required': 'Task ID is required',
        }),
})