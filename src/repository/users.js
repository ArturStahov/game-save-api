const User = require('../schemas/user.js')
const ObjectId = require('mongoose').Types.ObjectId;
const { HttpCode } = require('../helpers/constants.js')
const { ErrorHandler } = require('../helpers/errorHandler')

class UsersRepository {
    constructor() {
        this.model = User
    }

    _checkId(id) {
        if (!ObjectId.isValid(id)) {
            throw new ErrorHandler(HttpCode.BAD_REQUEST, `id: not valid!`, "Bad Request")
        }
    }

    async create(body) {
        const user = new this.model(body)
        return user.save()
    }

    async updateToken(id, token) {
        this._checkId(id)
        await this.model.updateOne({ _id: id }, { token })
    }
    async findByID(id) {
        this._checkId(id)
        const result = await this.model.findOne({ _id: id }).select("-__v")
        return result
    }

    async findByEmail(email) {
        const result = await this.model.findOne({ email }).select("-__v")
        return result
    }

    async updateAvatar(id, avatar) {
        this._checkId(id)
        await this.model.updateOne({ _id: id }, { avatar })
    }

}

module.exports = UsersRepository