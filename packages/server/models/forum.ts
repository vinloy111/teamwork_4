import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export declare type IForum = {
  caption: string
  idAuthor: string
}

export declare type ITopic = {
  caption: string
  idAuthor: string
}

export declare type IComment = {
  idTopic: string
  idMessage: string
}

export declare type IReply = {
  idParentMessage: string
  idMessage: string
}

export declare type IMessage = {
  idAuthor: string
  content: string
  dateCreate: string
  dateUpdate: string
}
export const forumModel: ModelAttributes<Model, IForum> = {
  idAuthor: {
    type: DataType.STRING,
  },
  caption: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export const topicModel: ModelAttributes<Model, ITopic> = {
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
