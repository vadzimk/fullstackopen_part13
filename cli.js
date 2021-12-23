import {PORT} from './util/config.js'
import express from 'express';

const app = express();
import {connectToDB} from './util/db.js';
import blogsRouter from './controllers/blogs.js'
import userRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
const start = async () => {
  await connectToDB()
  app.listen(PORT, () => {
    console.log('server running on port ', PORT);
  });
}

start()