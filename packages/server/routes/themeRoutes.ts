import { Router } from 'express'
import ThemeController from '../controllers/ThemeController'

/**
 * Ручки получения тем
 */
export const themeRoutes = (themeRouter: Router) => {
  const router = Router()

  router
    .get('/user/:userId', ThemeController.getUserTheme) // Получение темы пользователя по ID
    .put('/user', ThemeController.updateUserTheme) // Обновление темы пользователя
    .get('/', ThemeController.getAllThemes)

  themeRouter.use('/theme', router)
}

export default themeRoutes
