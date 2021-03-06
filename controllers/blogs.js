import express from 'express'

const blogsRouter = express.Router()

import {Blog, User} from '../models/index.js';
import 'express-async-errors'
import jwt from 'jsonwebtoken';
import {SECRET} from '../util/config.js';
import {Op} from 'sequelize';  // error handling middleware

// middleware
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization?.toLowerCase().startsWith('bearer')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      res.status(401).json({error: 'token invalid'})
    }
  } else {
    res.status(401).json({error: 'token missing'})
  }
  next()
}


blogsRouter.get('/', async (req, res) => {

  // SELECT * from blog WHERE ("blog"."title" LIKE '%react%' or "blog"."author" LIKE '%test%');
  let clause = {}
  if (req.query.search) {
    clause = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }
      ]
    }
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name']
    },
    where: clause,
    order: ['likes', 'DESC']
  })
  res.json(blogs)
});

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const note = await Blog.create({
    ...req.body,
    userId: user.id
  })
  res.json(note)

  // error is handled in middleware express-async-errors

});

blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  const success = await Blog.destroy({where: {id: req.params.id, userId: user.id}})
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
