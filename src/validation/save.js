const Joi = require('joi');
const { HttpCode } = require('../helpers/constants.js')

const schemaCreate = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()  
        .min(3)
        .max(100)
        .required(),
    image: Joi.string().optional(),
    rating: Joi.string().optional(),
    ratingCounter:Joi.string().optional(),
    owner: Joi.string().optional()
})

const schemaUpdate = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(100)
        .required(),
    image: Joi.string().optional(),
    rating: Joi.string().optional(),
    ratingCounter:Joi.string().optional(),
    owner: Joi.string().optional()
}).min(1);

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

module.exports.validateCreateSaveData = (req, res, next) => {
    return validate(schemaCreate, req.body, next)
}
module.exports.validateUpdateSaveData = (req, res, next) => {
    return validate(schemaUpdate, req.body, next)
}



