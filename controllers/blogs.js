import express from 'express'

const blogsRouter = express.Router()

import {Blog} from '../models/index.js';
import 'express-async-errors'  // error handling middleware

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
});

blogsRouter.post('/', async (req, res) => {

    const note = await Blog.create(req.body)
    res.json(note)

  // error is handled in middleware express-async-errors

});

blogsRouter.delete('/:id', async (req, res) => {
  const success = await Blog.destroy({where: {id: req.params.id}})
  if (success) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = Number(req.body.likes)
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

export default blogsRouter
