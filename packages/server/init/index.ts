import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { userModel, IUser } from '../models/user'
import { forumModel, commentModel, topicModel } from '../models/forum'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions =
  process.env.NODE_ENV === 'development'
    ? {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        dialect: 'postgres',
      }
    : {
        host: 'postgres',
        port: Number(POSTGRES_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        dialect: 'postgres',
      }

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
export const UserTable = sequelize.define('Users', userModel, {
  tableName: 'users',
})
export const ForumTable = sequelize.define('Forum', forumModel, {
  tableName: 'forum',
})
export const TopicsTable = sequelize.define('Topics', topicModel, {
  tableName: 'topics',
})
export const CommentsTable = sequelize.define('Comments', commentModel, {
  tableName: 'comments',
})
export const RepliesTable = sequelize.define('Replies', commentModel, {
  tableName: 'replies',
})
export const MessagesTable = sequelize.define('Messages', commentModel, {
  tableName: 'messages',
})

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
