const fs = require('fs').promises

const isAccessible = async (path) => {
    try {
        await fs.access(path)
        return true
    } catch (error) {
        return false
    }
}

const createFolderIsExist = async (folder) => {
    if (!(await isAccessible(folder))) {
        await fs.mkdir(folder)
    }
}

module.exports = createFolderIsExist

