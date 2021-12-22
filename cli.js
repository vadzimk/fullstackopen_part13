import dotenv from 'dotenv';

import { Sequelize, QueryTypes } from 'sequelize';

dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {},
  defline: {
    freezeTableName: true,
  },
});

const main = async () => {
    try{
        await sequelize.authenticate()
        console.log('connection success')
        const blogs = await sequelize.query('select * from blogs', {type: QueryTypes.SELECT})
        // console.log(blogs)
        blogs.forEach(b=>console.log(`${b.author}: '${b.title}', ${b.likes} likes`))
        sequelize.close()
    } catch(err){
        console.log('err', err)
    }
};

main()

