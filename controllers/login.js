import express from 'express'
import {User} from '../models/index.js';
import jwt from 'jsonwebtoken'
import {SECRET} from '../util/config.js';

const loginRouter = express.Router()

loginRouter.post('/', async(req,res)=>{
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  const isPasswordCorrect = req.body.password === 'secret'
  if(!user || !isPasswordCorrect){
    res.status(401).json({error: 'invalid username or password'})
  }
  const userForToken = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(userForToken, SECRET)
  res.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
})


export default loginRouter