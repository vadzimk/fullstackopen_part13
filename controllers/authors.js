import express from 'express'
import {Blog, User} from '../models/index.js';
import 'express-async-errors'  // error handling middleware

const authorsRouter = express.Router()
//     author: "Jami Kousa",
//     articles: "3",
//     likes: "10"
// select name from user
authorsRouter.get('/', async(req,res)=>{
  const result = await User.findAll({
    attributes: [['name', 'author']],
    include: {
      model: Blog,
      attributes: ['likes']
    }
  })

  console.log(result.map(i=>i.toJSON()))
  const authors = result.map(i=>{
    const item = i.toJSON()
    return {
    author: item.author,
    articles: item.blogs.length,
    likes: item.blogs.reduce((acc, e)=> acc + e.likes, 0)
  }})
  res.json(authors)



})


export default authorsRouter