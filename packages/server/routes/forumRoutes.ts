import express from 'express'
import ForumController from '../controllers/ForumController'

const router = express.Router()

router.get('/', ForumController.getForum)

export default router
