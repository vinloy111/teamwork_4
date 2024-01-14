import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { userModel } from '../models/user'
import { reactionModel } from '../models/reaction'
import {
  forumModel,
  commentModel,
  topicModel,
  messageModel,
  replyModel,
} from '../models/forum'

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
export const UserTable = sequelize.define('Users', userModel)
export const ReactionTable = sequelize.define('Reaction', reactionModel)
export const ForumTable = sequelize.define('Forum', forumModel)
export const TopicsTable = sequelize.define('Topics', topicModel)
export const CommentsTable = sequelize.define('Comments', commentModel)
export const RepliesTable = sequelize.define('Replies', replyModel)
export const MessagesTable = sequelize.define('Messages', messageModel)

/** Связи */
TopicsTable.hasMany(CommentsTable, {
  onDelete: 'cascade',
  foreignKey: 'idTopic',
})
CommentsTable.belongsTo(TopicsTable, { foreignKey: 'idTopic' })

MessagesTable.hasOne(CommentsTable)
CommentsTable.belongsTo(MessagesTable, {
  foreignKey: 'idMessage',
  onDelete: 'cascade',
})

MessagesTable.hasOne(RepliesTable)
RepliesTable.belongsTo(MessagesTable, {
  foreignKey: 'idMessage',
  onDelete: 'cascade',
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
