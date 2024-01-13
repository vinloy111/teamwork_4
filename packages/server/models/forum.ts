import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  firstName: string
  lastName: string
}

export declare type IForum = {
  id: string
  caption: string
  idAuthor: string
}

export declare type ITopic = {
  id: string
  caption: string
  idAuthor: string
}

export declare type IComment = {
  id: string
  idTopic: string
  idMessage: string
}

export declare type IReply = {
  id: string
  idParentMessage: string
  idMessage: string
}

export declare type IMessage = {
  id: string
  idAuthor: string
  content: string
  dateCreate: string
  dateUpdate: string
}
export const forumModel: ModelAttributes<Model, IForum> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  idAuthor: {
    type: DataType.STRING,
    allowNull: false,
  },
  caption: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  idAuthor: {
    type: DataType.STRING,
    allowNull: false,
  },
  caption: {
    type: DataType.STRING,
    allowNull: false,
  },
}
export const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  idMessage: {
    type: DataType.STRING,
    allowNull: false,
  },
  idTopic: {
    type: DataType.STRING,
    allowNull: false,
  },
}
export const replyModel: ModelAttributes<Model, IReply> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  idParentMessage: {
    type: DataType.STRING,
    allowNull: false,
  },
  idMessage: {
    type: DataType.STRING,
    allowNull: false,
  },
}
export const messageModel: ModelAttributes<Model, IMessage> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  idAuthor: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
  dateCreate: {
    type: DataType.STRING,
    allowNull: false,
  },
  dateUpdate: {
    type: DataType.STRING,
    allowNull: false,
  },
}
