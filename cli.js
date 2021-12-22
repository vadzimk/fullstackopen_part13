import {PORT} from './util/config.js'
import express from 'express';

const app = express();
import blogsRouter from './controllers/blogs.js'
import {connectToDB} from './util/db.js';

app.use(express.json())
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDB()
  app.listen(PORT, () => {
    console.log('server running on port ', PORT);
  });
}

start()