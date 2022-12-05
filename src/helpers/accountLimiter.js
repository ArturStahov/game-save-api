const rateLimit = require("express-rate-limit");
const { HttpCode } = require('./constants')

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 5 requests
    handler: (req, res, next) => {
        res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: 'Error limit registration in 1 hour!'
        })
    }
});

module.exports = accountLimiter

