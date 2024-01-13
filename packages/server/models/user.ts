import { DataType, Model, Table, Column } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  id: string
  firstName: string
  lastName: string
}

export const userModel: ModelAttributes<Model, IUser> = {
  id: {
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
  },
}
