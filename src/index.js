const app = require('./app.js')
const db = require('./db/db-config.js')
const createFolderIsExist = require('./helpers/createDir')
require('dotenv').config()

const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATARS_DIR = process.env.AVATARS_DIR
const PORT = process.env.PORT || 3000

async function startApp() {
    try {
        await db
        app.listen(PORT, async () => {
            await createFolderIsExist(UPLOAD_DIR)
            await createFolderIsExist(AVATARS_DIR)
            console.log(`server running.Use our Api on port:${PORT}`)
        })
    } catch (error) {
        console.log(`Server not running ! Error :${error.message}`)
    }
}

startApp()
