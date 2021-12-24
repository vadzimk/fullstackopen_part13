import express from 'express'
import {Blog, User} from '../models/index.js';
import 'express-async-errors'
import {fn, col, literal} from 'sequelize';  // error handling middleware

const authorsRouter = express.Router()
//     author: "Jami Kousa",
//     articles: "3",
//     likes: "10"
// select name from user
authorsRouter.get('/', async(req,res)=>{
  const result = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'articles'],
      [fn('SUM', col('likes')), 'likes']],
    group: ['author'],
    order: literal('"articles" DESC') // literally plug in sql
  })

  // console.log(result.map(i=>i.toJSON()))
  // const authors = result.map(i=>{
  //   const item = i.toJSON()
  //   return {
  //   author: item.author,
  //   articles: item.blogs.length,
  //   likes: item.blogs.reduce((acc, e)=> acc + e.likes, 0)
  // }})
  res.json(result)



})


export default authorsRouter