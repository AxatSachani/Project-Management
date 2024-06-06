import Joi from 'joi';

export const projectCreateSchema = Joi.object({
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
    startDate: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Start Date should be a valid date',
            'date.format': 'Start Date should be in ISO date format',
            'any.required': 'Start Date is required',
        }),
    endDate: Joi.date()
        .iso()
        .min(Joi.ref('startDate'))
        .required()
        .messages({
            'date.base': 'End Date should be a valid date',
            'date.format': 'End Date should be in ISO date format',
            'date.min': 'End Date should be after Start Date',
            'any.required': 'End Date is required',
        }),
});


export const projectUpdateSchema = Joi.object({
    projectID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'any.required': 'Project ID is required',
            'string.hex': 'Project ID should be a hexadecimal string',
            'string.length': 'Project ID should be 24 characters long',
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
    startDate: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Start Date should be a valid date',
            'date.format': 'Start Date should be in ISO date format',
            'any.required': 'Start Date is required',
        }),
    endDate: Joi.date()
        .iso()
        .min(Joi.ref('startDate'))
        .required()
        .messages({
            'date.base': 'End Date should be a valid date',
            'date.format': 'End Date should be in ISO date format',
            'date.min': 'End Date should be after Start Date',
            'any.required': 'End Date is required',
        }),
});


export const projectDeleteSchema = Joi.object({
    projectID: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'any.required': 'Project ID is required',
            'string.hex': 'Project ID should be a hexadecimal string',
            'string.length': 'Project ID should be 24 characters long',
        }),
})