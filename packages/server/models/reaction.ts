import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IReaction {
  id: number
  userId: string
  emojiId: string
  topicId: string
}

export const reactionModel: ModelAttributes<Model, IReaction> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataType.STRING,
  },
  emojiId: {
    type: DataType.STRING,
  },
  topicId: {
    type: DataType.STRING,
  },
}
