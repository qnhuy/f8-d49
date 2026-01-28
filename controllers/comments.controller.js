const commentModel = require('../models/comment.model')

function getAll(_, res) {
  const comments = commentModel.findAll()
  res.json({ data: comments })
}

function getOne(req, res) {
  const comment = commentModel.findOne(+req.params.id)
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
  const updatedComment = commentModel.update(+req.params.id, req.body)
  if (!updatedComment) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ data: updatedComment })
}

function remove(req, res) {
  const removedComment = commentModel.remove(+req.params.id)
  if (!removedComment) {
    res.status(404).json({ message: 'Resource not found' })
    return
  }
  res.json({ message: 'Delete successfully', data: removedComment })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
}
