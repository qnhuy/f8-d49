const { loadDB, saveDB } = require('../../utils/jsonDB')

let postDB = []
let biggestId = -1

loadDB('posts').then((result) => {
  postDB = result
  biggestId = postDB?.slice(-1)[0]?.id ?? 0
})

function savePostToDB() {
  saveDB('posts', postDB)
}

const Post = {
  findAll() {
    return postDB
  },

  findOne(id) {
    return postDB.find((post) => post.id === id)
  },

  create(data) {
    const newPost = {
      id: ++biggestId,
      ...data,
      createdAt: new Date().toISOString(),
    }
    postDB.push(newPost)
    savePostToDB()
    return newPost
  },

  update(id, data) {
    const updatePost = postDB.find((post) => post.id === id)
    if (!updatePost) return
    Object.assign(updatePost, data)
    savePostToDB()
    return updatePost
  },

  remove(id) {
    const removingPostIndex = postDB.findIndex((post) => post.id === id)
    if (!removingPostIndex) return
    const removingPost = postDB[removingPostIndex]
    postDB.splice(removingPostIndex, 1)
    savePostToDB()
    return removingPost
  },
}

module.exports = Post
