const { mkdir, readFile, writeFile } = require('node:fs/promises')
const path = require('path')

const DB_PATH = path.join(__dirname, '../db')

async function ensureDBDir() {
  await mkdir(DB_PATH, { recursive: true })
}

async function loadDB(resourceName) {
  await ensureDBDir()

  try {
    const result = await readFile(
      path.join(DB_PATH, `${resourceName}.json`),
      'utf-8',
    )
    return JSON.parse(result)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(
        path.join(DB_PATH, `${resourceName}.json`),
        JSON.stringify([]),
      )
    }

    return []
  }
}

async function saveDB(resourceName, data) {
  await ensureDBDir()

  await writeFile(
    path.join(DB_PATH, `${resourceName}.json`),
    JSON.stringify(data, null, 2),
  )
}

module.exports = {
  loadDB,
  saveDB,
}
