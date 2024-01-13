import type { Request, Response } from 'express'
import { ForumTable, TopicsTable } from '../init'

class ForumController {
  /** Получение данных форума */
  async getForum(req: Request, res: Response): Promise<Response> {
    try {
      /* const forum = await ForumTable.create({caption : "Форум Игры" });
       console.log("Jane's auto-generated ID:", forum);*/
      const forumFromBd = await ForumTable.findOne()
      return res.status(200).json(forumFromBd)
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
      const { idAuthor, caption } = req.body

      const newTopic = await TopicsTable.create({
        caption: caption,
        idAuthor: idAuthor,
      })
      return res.status(200).json(newTopic)
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
      return res.status(200).json(topic)
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
  getTest(req: Request, res: Response) {
    res.json({ forum: 'name' })
  }
}

export default new ForumController()
