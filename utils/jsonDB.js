const { readFile, writeFile } = require('node:fs/promises')
const path = require('path')

const DB_PATH = path.join(__dirname, '../db')

async function loadDB(resourceName) {
  try {
    const result = await readFile(
      path.join(DB_PATH, `${resourceName}.json`),
      'utf-8',
    )
    return JSON.parse(result)
  } catch (err) {
    if (err.code === 'ENOENT') {
      writeFile(
        path.join(DB_PATH, `${resourceName}.json`),
        JSON.stringify([]),
      )
    }
  }
}

async function saveDB(resourceName, data) {
  await writeFile(
    path.join(DB_PATH, `${resourceName}.json`),
    JSON.stringify(data, null, 2),
  )
}

module.exports = {
  loadDB,
  saveDB,
}
