import Blog from './Blog.js'
import User from '../models/User.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.sync({alter: true})
Blog.sync({alter: true})

export {User, Blog}