import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUserTheme {
  id?: number
  userId: string
  themeId: number
}

export const userThemeModel: ModelAttributes<Model, IUserTheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataType.STRING,
    allowNull: false,
  },
  themeId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'SiteThemes',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}
