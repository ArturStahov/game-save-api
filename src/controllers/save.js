const { HttpCode } = require('../helpers/constants.js')
const { SaveServices } = require('../services')

const saveService = new SaveServices();

const getAll = async (req, res, next) => {
    try {
        const saveData = await saveService.getAll()
        res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                saveData,
            }
        })
    } catch (error) {
        next(error)
    }
}


const getByIDMy = async (req, res, next) => {
    try {
        const userId = req.user.id
        const saveData = await saveService.getByIDMy(req.params, userId)

        if (saveData) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    saveData,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const userId = req.user.id
        const saveData = await saveService.create(req.body, userId)
        res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                saveData,
            }
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.user.id//not need for update rating, maybe need add new method for update by only if this item is some user item
        const saveData = await saveService.update(req.params, req.body, userId)

        if (saveData) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    saveData,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const patch = async (req, res, next) => {
    try {
        const userId = req.user.id
        const saveData = await saveService.update(req.params, req.body, userId)

        if (saveData) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    saveData,
                }
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const userId = req.user.id
        const saveData = await saveService.remove(req.params, userId)

        if (saveData) {
            res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
            })
        } else {
            return next({
                status: HttpCode.NOT_FOUND,
                message: "not found!",
                data: 'not found!'
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAll,
    getByIDMy,
    create,
    update,
    patch,
    remove
}