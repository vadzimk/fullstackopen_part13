import express from 'express'
const blogsRouter = express.Router()

import {Blog} from '../models/index.js';

blogsRouter.get('/api/blogs', async(req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error);
  }
});

blogsRouter.post('/api/blogs', async (req, res) => {
  try{
    const note = await Blog.create(req.body)
    res.json(note)
  } catch(err){
    console.log(err)
  }
});

blogsRouter.delete('/api/blogs/:id', async (req, res) => {
  const success = await Blog.destroy({where:{id:req.params.id}})
  if(success){
    res.status(204).end()
  } else{
    res.status(404).end()
  }
});
