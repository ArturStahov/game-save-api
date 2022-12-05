const express = require('express')
const controllersUsers = require('../../controllers/users.js')
const router = express.Router()
const guard = require('../../helpers/guard')
const upload = require('../../helpers/upload')
const { validateCreateUser, validateUploadAvatar } = require('../../validation/users.js')
const accountLimiter = require('../../helpers/accountLimiter')


router.post('/registration', accountLimiter, validateCreateUser, controllersUsers.reg)
router.post('/login', controllersUsers.login)
router.post('/logout', guard, controllersUsers.logout)
router.patch('/avatar', guard, upload.single('avatar'), validateUploadAvatar, controllersUsers.avatars)


module.exports = router

//upload.single('avatar') this prop in html input name='avatar'