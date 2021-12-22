import express from 'express'

const blogsRouter = express.Router()

import {Blog} from '../models/index.js';

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.post('/', async (req, res) => {
  try {
    const note = await Blog.create(req.body)
    res.json(note)
  } catch (err) {
    console.log(err)
  }
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
