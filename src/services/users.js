const { UsersRepository } = require('../repository')

class UserServices {
    constructor() {
        this.repositories = {
            users: new UsersRepository()
        }
    }

    async create(body) {
        const data = await this.repositories.users.create(body)
        return data
    }

    async findByEmail(email) {
        const data = await this.repositories.users.findByEmail(email)
        return data
    }

    async findByID(id) {
        const data = await this.repositories.users.findByID(id)
        return data
    }

    async updateAvatar(id, avatar) {
        const data = await this.repositories.users.updateAvatar(id, avatar)
        return data
    }
}

module.exports = UserServices