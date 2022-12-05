const { SaveDataRepository } = require('../repository')


class SaveServices {
    constructor() {
        this.repositories = {
            saveData: new SaveDataRepository()
        }
    }

    async getAll() {
        const data = await this.repositories.saveData.getAll()
        return data
    }

    async getByIDMy({ id }, userId) {
        const data = await this.repositories.saveData.getByIDMy(id, userId)
        return data
    }

    async create(body, userId) {
        const data = await this.repositories.saveData.create(body, userId)
        return data
    }

    async update({ id }, body, userId) {
        const data = await this.repositories.saveData.update(id, body, userId)
        return data
    }

    async remove({ id }, userId) {
        const data = await this.repositories.saveData.remove(id, userId)
        return data
    }
}

module.exports = SaveServices