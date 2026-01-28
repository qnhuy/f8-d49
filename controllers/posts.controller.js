const postModel = require('../models/post.model')

function getAll(_, res) {
  const posts = postModel.findAll()
  res.json({ data: posts })
}

function getOne(req, res) {
  const post = postModel.findOne(+req.params.id)
  if (!post) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: post })
}

function create(req, res) {
  const newPost = postModel.create(req.body)
  res.status(201).json({ data: newPost })
}

function update(req, res) {
  const updatedPost = postModel.update(+req.params.id, req.body)
  if (!updatedPost) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: updatedPost })
}

function remove(req, res) {
  const removedPost = postModel.remove(+req.params.id)
  if (!removedPost) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ message: 'Delete successfully', data: removedPost })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
}
