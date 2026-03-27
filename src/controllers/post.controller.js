const postModel = require('../models/post.model')

function parseId(idParam) {
  const id = Number(idParam)
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }
  return id
}

function getAll(_, res) {
  const posts = postModel.findAll()
  res.json({ data: posts })
}

function getOne(req, res) {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const post = postModel.findOne(id)
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
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const updatedPost = postModel.update(id, req.body)
  if (!updatedPost) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: updatedPost })
}

function remove(req, res) {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const removedPost = postModel.remove(id)
  if (!removedPost) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.sendStatus(204)
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
}
