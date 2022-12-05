const passports = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config();
const { UserService } = require('../services')

const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passports.use(new Strategy(params, async (payload, done) => {
    try {
        const service = new UserService()
        const user = await service.findByID(payload.id)
        if (!user) {
            done(new Error('No user'))
        }
        if (!user.token) {
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        done(e)
    }
}));