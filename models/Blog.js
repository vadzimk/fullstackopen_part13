
/*
create table blogs(
  id serial primary key,
  author text,
  url text not null,
  title text not null,
  likes int default 0
)
*/

import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../util/db.js';

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
export default Blog