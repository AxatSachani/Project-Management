import Joi from 'joi';

export const useRregisterSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'User Name should be a type of text',
            'string.empty': 'User Name cannot be an empty field',
            'any.required': 'User Name is a required field',
        }),
    emailID: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'Email format is invalid',
            'any.required': 'Email is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be an empty field',
            'any.required': 'Password is a required field',
        })
});

export const userLoginSchema = Joi.object({
    emailID: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'Email format is invalid',
            'any.required': 'Email is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be an empty field',
            'any.required': 'Password is a required field',
        }),
});

export const useCreateSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'User Name should be a type of text',
            'string.empty': 'User Name cannot be an empty field',
            'any.required': 'User Name is a required field',
        }),
    emailID: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'Email format is invalid',
            'any.required': 'Email is a required field',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be an empty field',
            'any.required': 'Password is a required field',
        }),
    role: Joi.string()
        .valid('admin', 'project_manager', 'team_member')
        .required()
        .messages({
            'string.base': 'Role should be a string',
            'string.empty': 'Role is required',
            'any.only': 'Role should be one of "admin", "project_manager", or "team_member"',
            'any.required': 'Role is required',
        })
});