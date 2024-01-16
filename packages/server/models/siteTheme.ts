import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ISiteTheme {
  id?: number
  theme: string
  description: string
}

export const siteThemeModel: ModelAttributes<Model, ISiteTheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
}
