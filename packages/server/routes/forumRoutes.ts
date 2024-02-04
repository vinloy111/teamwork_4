import ForumController from '../controllers/ForumController'
import MessagesController from '../controllers/MessagesController'

import { Router } from 'express'

/**
 * Ручки форума
 */
export const forumRoutes = (forumRouter: Router) => {
  const router = Router()

  router
    .get('/', ForumController.getForum) /** Получение форума */
    .get('/topic', ForumController.getTopics) /** Получение всех топиков */
    .get('/topic/:id', ForumController.getTopic) /** Получение топика по id **/
    .post('/topic', ForumController.createTopic) /** Создание топика **/
    .delete('/topic/:id', ForumController.deleteTopic) /** Удаление топика **/
    .put('/topic/:id', ForumController.updateTopic) /** Обновление топика **/
    .get(
      '/topic/:id/comments',
      MessagesController.getComments
    ) /** Получение всех комментариев топика */
    .post(
      '/comment',
      MessagesController.createComment
    ) /** Создание комментария */
    .delete(
      '/comment/:id',
      MessagesController.deleteComments
    ) /** Удаление комментария **/
    .get(
      '/comment/:id/replies',
      MessagesController.getReplies
    ) /** Получение всех ответов на комментарии */
    .post('/reply', MessagesController.createReply) /** Создание ответа **/
    .delete(
      '/reply/:id',
      MessagesController.deleteReplies
    ) /** Удаление ответа **/
    .put(
      '/message/:id',
      MessagesController.updateMessage
    ) /** Обновление сообщения **/

  forumRouter.use('/forum', router)
}

export default forumRoutes
