import express from 'express'
import ThemeController from '../controllers/ThemeController'

const router = express.Router()

// Получение темы пользователя по ID
router.get('/user/:userId', ThemeController.getUserTheme)

// Обновление темы пользователя
router.put('/user', ThemeController.updateUserTheme)

router.get('/', ThemeController.getAllThemes)

export default router
