import express from 'express'
import ForumController from '../controllers/ForumController'

const router = express.Router()

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

/** Получение данных форума */
router.get('/', ForumController.getForum)
export default router
