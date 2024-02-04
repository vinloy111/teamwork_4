import { Router } from 'express'
import { reactionController } from '../controllers/ReactionController'

/**
 * Ручки реакций
 */
export const reactionRoutes = (reactionRoute: Router) => {
  const router = Router()

  router
    .get('/topic/:topicId', reactionController.getReactions)
    .post('/add', reactionController.addReaction)
    .put('/:id/update', reactionController.updateReaction)
    .delete('/:id/delete/topic/:topicId', reactionController.deleteReaction)

  reactionRoute.use('/reaction', router)
}

export default reactionRoutes
