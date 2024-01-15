import type { Request, Response } from 'express'
import { CommentsTable, ForumTable, MessagesTable, TopicsTable } from '../init'

class ForumController {
  /** Получение данных форума */
  async getForum(req: Request, res: Response): Promise<Response> {
    try {
      const forumFromBd = await ForumTable.findOne()
      if (!forumFromBd) {
        const forum = await ForumTable.create({ caption: 'Форум Игры' })
        return res.status(404).json({ ...forum?.dataValues, listOfTopics: [] })
      }

      const topics = await TopicsTable.findAll()
      return res
        .status(200)
        .json({ ...forumFromBd?.dataValues, listOfTopics: topics })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getForum',
        error,
      })
    }
  }

  /** Создание топика */
  async createTopic(req: Request, res: Response): Promise<Response> {
    try {
      const { idAuthor, caption, userName } = req.body

      const newTopic = await TopicsTable.create({
        caption: caption,
        idAuthor: idAuthor,
        userName: userName,
      })
      return res.status(201).json(newTopic)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - createTopic',
        error,
      })
    }
  }

  /** Обновление топика */
  async updateTopic(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { userId, caption } = req.body

      await TopicsTable.update(
        { caption, idAuthor: userId },
        {
          where: { id },
        }
      )
      const newTopic = await TopicsTable.findAll({
        where: {
          id,
        },
      })
      return res.status(200).json(newTopic)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateTopic',
        error,
      })
    }
  }

  /** Получение топика по id */
  async getTopic(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const topic = await TopicsTable.findOne({
        where: {
          id,
        },
      })
      const comments = await CommentsTable.findAll({
        where: {
          idTopic: id,
        },
        include: [
          {
            model: MessagesTable,
            attributes: ['content', 'idAuthor', 'userName'],
          },
        ],
      })

      return res.status(200).json({
        ...topic?.dataValues,
        listOfMessages: comments.map(comment => {
          const { id, idMessage, idTopic, createdAt, updatedAt, Message } =
            comment.dataValues
          return {
            id,
            idMessage,
            idTopic,
            createdAt,
            updatedAt,
            content: Message.content,
            idAuthor: Message.idAuthor,
            userName: Message.userName,
          }
        }),
        countOfMessage: comments.length,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateTopic',
        error,
      })
    }
  }

  /** Получение топиков */
  async getTopics(req: Request, res: Response): Promise<Response> {
    try {
      const topics = await TopicsTable.findAll()
      return res.status(200).json(topics)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getTopics',
        error,
      })
    }
  }

  /** Удаление топика по id */
  async deleteTopic(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await TopicsTable.destroy({
        where: {
          id,
        },
      })
      return res.status(200).json({ deleted: true })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - deleteTopic',
        error,
      })
    }
  }
}

export default new ForumController()
