import type { Request, Response } from 'express'
import { UserTheme, SiteTheme } from '../init'

class ThemeController {
  /**
   * Получение темы пользователя по ID
   */
  async getUserTheme(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params
      const userTheme = await UserTheme.findOne({
        where: { userId },
        include: [{ model: SiteTheme, as: 'siteTheme' }],
      })

      if (!userTheme) {
        return res.status(404).json({ message: 'Тема пользователя не найдена' })
      }

      return res.status(200).json(userTheme)
    } catch (error) {
      return res.status(500).json({
        message: 'Ошибка при получении темы пользователя',
        error,
      })
    }
  }

  /**
   * Обновление или создание темы пользователя
   */
  async updateUserTheme(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, themeId } = req.body

      const [userTheme, created] = await UserTheme.findOrCreate({
        where: { userId },
        defaults: { userId, themeId },
      })

      if (!created) {
        await userTheme.update({ themeId })
      }

      return res.status(200).json(userTheme)
    } catch (error) {
      return res.status(500).json({
        message: 'Ошибка при обновлении темы пользователя',
        error,
      })
    }
  }

  /**
   * Получение всех имеющихся тем
   */
  async getAllThemes(req: Request, res: Response) {
    try {
      const themes = await SiteTheme.findAll()
      res.status(200).json(themes)
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving themes', error })
    }
  }
}

export default new ThemeController()
