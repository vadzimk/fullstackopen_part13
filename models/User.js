import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../util/db.js';

class User extends Model{}

User.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username:{
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

export default User