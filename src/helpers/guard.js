const passports = require('passport')
require('../config/passport')
const { HttpCode } = require('../helpers/constants.js')

const guard = (req, res, next) => {
    passports.authenticate('jwt', { session: false }, (err, user) => {
        const token = req.get('Authorization')?.split(' ')[1]
        console.log(token,"token!!!!!!!!!!!!");

        if (!user || err || token !== user.token) {
            return res.status(HttpCode.FORBIDDEN).json({
                status: 'error',
                code: HttpCode.FORBIDDEN,
                data: 'Forbidden',
                message: 'Access is denied',
            })
        }
        req.user = user
        console.log(req,"req!!!!!!!!!!!!");
        return next()
    })(req, res, next)
}

module.exports = guard