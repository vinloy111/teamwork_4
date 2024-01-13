import express from 'express'
import ForumController from '../controllers/ForumController'
import MessagesController from '../controllers/MessagesController'

const router = express.Router()
/** Получение данных форума */
router.get('/', ForumController.getForum)

/** Топики - темы форума */
/** Получение всех топиков */
router.get('/topic', ForumController.getTopics)
/** Получение топика по id **/
router.get('/topic/:id', ForumController.getTopic)
/** Создание топика **/
router.post('/topic', ForumController.createTopic)
/** Удаление топика **/
router.delete('/topic/:id', ForumController.deleteTopic)
/** Обновление топика **/
router.put('/topic/:id', ForumController.updateTopic)

/** Комментарии */
/** Получение всех комментариев топика */
router.get('/topic/:id/comments', MessagesController.getComments)
/** Создание комментария
 * { content, idTopic, idAuthor }
 * */
router.post('/comment', MessagesController.createComment)
/** Удаление комментария **/
router.delete('/comment/:id', MessagesController.deleteComments)

/** Ответы на комментарии */
/** Получение всех ответов на комментарии */
router.get('/comment/:id/replies', MessagesController.getReplies)
/** Создание ответа **/
router.post('/reply', MessagesController.createReply)
/** Удаление ответа **/
router.delete('/reply/:id', MessagesController.deleteReplies)

/** Обновление сообщения **/
router.put('/message/:id', MessagesController.updateMessage)

export default router
