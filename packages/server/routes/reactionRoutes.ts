import express from 'express'
import { reactionController } from '../controllers/ReactionController'

const reactionRoutes = express.Router()

reactionRoutes.get('/topic/:topicId', reactionController.getReactions)
reactionRoutes.post('/add', reactionController.addReaction)
reactionRoutes.put('/:id/update', reactionController.updateReaction)
reactionRoutes.delete(
  '/:id/delete/topic/:topicId',
  reactionController.deleteReaction
)

export default reactionRoutes
