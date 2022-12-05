const Joi = require('joi');
const { HttpCode } = require('../helpers/constants.js')

const schemaCreate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(25)
        .optional(),
    email: Joi.string()
        .email()
        .max(50)
        .required(),
    password: Joi.string()
        .min(8)
        .max(50)
        .required(),

})


const validate = (schema, body, next) => {
    const { error } = schema.validate(body)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: HttpCode.BAD_REQUEST,
            message: `Filed:${message.replace(/"/g, '')}`,//reqexp  
            data: 'Bad Request!'
        })
    }
    next()
}

module.exports.validateCreateUser = (req, res, next) => {
    return validate(schemaCreate, req.body, next)
}

module.exports.validateUploadAvatar = (req, res, next) => {
    if (!req.file) {
        return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            data: 'Bad request',
            message: 'Field of "avatar" not found!'
        })
    }
    next()
}

