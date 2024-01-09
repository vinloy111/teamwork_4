import express from 'express'
import ThemeController from '../controllers/ThemeController'

const router = express.Router()

router.get('/', ThemeController.getCurrentTheme)

export default router
