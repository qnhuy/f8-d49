const { loadDB, saveDB } = require('../../utils/jsonDB')

let commentDB = []
let biggestId = -1

loadDB('comments').then((result) => {
  commentDB = result
  biggestId = commentDB?.slice(-1)[0]?.id ?? 0
})

function saveCommentsToDB() {
  saveDB('comments', commentDB)
}

const Comment = {
  findAll() {
    return commentDB
  },

  findOne(id) {
    return commentDB.find((comment) => comment.id === id)
  },

  create(data) {
    const newComment = {
      id: ++biggestId,
      ...data,
      createdAt: new Date().toISOString(),
    }
    commentDB.push(newComment)
    saveCommentsToDB()
    return newComment
  },

  update(id, data) {
    const updateComment = commentDB.find((comment) => comment.id === id)
    if (!updateComment) return
    Object.assign(updateComment, data)
    saveCommentsToDB()
    return updateComment
  },

  remove(id) {
    const removingCommentIndex = commentDB.findIndex(
      (comment) => comment.id === id,
    )
    if (!removingCommentIndex) return
    const removingComment = commentDB[removingCommentIndex]
    commentDB.splice(removingCommentIndex, 1)
    saveCommentsToDB()
    return removingComment
  },
}

module.exports = Comment
