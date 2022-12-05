const express = require('express')
const controllersSave = require('../../controllers/save.js')
const router = express.Router()
const { validateCreateSaveData, validateUpdateSaveData } = require('../../validation/save.js')
const guard = require('../../helpers/guard')


router.get('/',guard, controllersSave.getAll)
router.post('/', guard, validateCreateSaveData, controllersSave.create)
router.get('/:id', guard, controllersSave.getByIDMy)
router.put('/:id', guard, validateUpdateSaveData, controllersSave.update)
router.patch('/:id', guard, validateUpdateSaveData, controllersSave.patch)
router.delete('/:id', guard, controllersSave.remove)

module.exports = router