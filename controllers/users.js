import express from 'express'
import {User} from '../models/index.js';

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    res.status(400).json({error})
  }

})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where:{
      username: req.params.username
    }
  })
  if(user){
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else{
    res.status(404).end()
  }
})


export default userRouter