const commentModel = require('../models/comment.model')

function parseId(idParam) {
  const id = Number(idParam)
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }
  return id
}

function getAll(_, res) {
  const comments = commentModel.findAll()
  res.json({ data: comments })
}

function getOne(req, res) {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const comment = commentModel.findOne(id)
  if (!comment) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: comment })
}

function create(req, res) {
  const newComment = commentModel.create(req.body)
  res.status(201).json({ data: newComment })
}

function update(req, res) {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const updatedComment = commentModel.update(id, req.body)
  if (!updatedComment) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: updatedComment })
}

function remove(req, res) {
  const id = parseId(req.params.id)
  if (!id) {
    res.status(400).json({ message: 'Invalid resource id' })
    return
  }

  const removedComment = commentModel.remove(id)
  if (!removedComment) {
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
