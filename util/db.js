import {Sequelize} from 'sequelize';
import {DATABASE_URL} from './config.js';


export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (e) {
    console.log('error connecting to db ', e)
  }
  return null
}