import dotenv from 'dotenv';
import { Sequelize, QueryTypes, Model, DataTypes } from 'sequelize';
import express from 'express';

dotenv.config();
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {},
  defline: {
    freezeTableName: true,
  },
});

// const main = async () => {
//     try{
//         await sequelize.authenticate()
//         console.log('connection success')
//         const blogs = await sequelize.query('select * from blogs', {type: QueryTypes.SELECT})
//         // console.log(blogs)
//         blogs.forEach(b=>console.log(`${b.author}: '${b.title}', ${b.likes} likes`))
//         sequelize.close()
//     } catch(err){
//         console.log('err', err)
//     }
// };

// main()

/* 
create table blogs(
  id serial primary key,
  author text,
  url text not null,
  title text not null,
  likes int default 0
)
*/

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize, timestamps: false, modelName: 'blog' }
);

Blog.sync();
app.get('/api/blogs', async(req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/blogs', async (req, res) => {
  try{
    const note = await Blog.create(req.body)
    res.json(note)
  } catch(err){
    console.log(err)
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const success = await Blog.destroy({where:{id:req.params.id}})
  if(success){
    res.status(204)
  } else{
    res.status(404)
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log('server running on port ', port);
});
