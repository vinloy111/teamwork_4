import type { Request, Response } from 'express'
import { CommentsTable, MessagesTable, RepliesTable } from '../init'

/**
 * Контроллер для создания, обновления, удаления комментариев и ответов
 */
class MessagesController {
  /** Обновление сообщения */
  async updateMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { content } = req.body

      await MessagesTable.update(
        { content },
        {
          where: { id },
        }
      )
      const newMessage = await MessagesTable.findOne({
        where: {
          id,
        },
      })
      return res.status(200).json(newMessage)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateMessage',
      })
    }
  }

  /** Создание комментария */
  async createComment(req: Request, res: Response): Promise<Response> {
    try {
      const { content, idTopic, idAuthor, userName } = req.body

      const newMessage = await MessagesTable.create({
        content: content,
        idAuthor: idAuthor,
        userName: userName,
      })
      const newComment = await CommentsTable.create({
        idTopic: idTopic,
        idMessage: newMessage.id,
      })

      return res.status(201).json({
        ...newComment.dataValues,
        content: newMessage.dataValues.content,
        idAuthor: newMessage.dataValues.idAuthor,
        userName: newMessage.dataValues.userName,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - createComment',
      })
    }
  }

  /** Получение всех комментариев топика по id */
  async getComments(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const comments = await CommentsTable.findAll({
        where: {
          idTopic: id,
        },
        include: [
          { model: MessagesTable, attributes: ['content', 'idAuthor'] },
        ],
      })
      return res.status(200).json(comments)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getComments',
      })
    }
  }

  /** Удаление комментария по id */
  async deleteComments(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await CommentsTable.destroy({
        where: {
          id,
        },
      })
      return res.status(200).json({ deletedId: id })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - deleteTopic',
      })
    }
  }

  /** Получение всех ответов на комментарий */
  async getReplies(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const replies = await RepliesTable.findAll({
        where: {
          idComment: id,
        },
        include: [
          { model: MessagesTable, attributes: ['content', 'idAuthor'] },
        ],
      })
      return res.status(200).json(
        replies.map(comment => {
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
          }
        })
      )
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getComments',
      })
    }
  }

  /** Создание ответа */
  async createReply(req: Request, res: Response): Promise<Response> {
    try {
      const { content, idComment, idAuthor, userName } = req.body

      const newMessage = await MessagesTable.create({
        content: content,
        idAuthor: idAuthor,
        userName: userName,
      })
      const newComment = await RepliesTable.create({
        idComment: idComment,
        idMessage: newMessage.id,
      })
      return res.status(201).json({
        ...newComment.dataValues,
        content: newMessage.dataValues.content,
        idAuthor: newMessage.dataValues.idAuthor,
        userName: newMessage.dataValues.userName,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - createComment',
      })
    }
  }

  /** Удаление ответа по id */
  async deleteReplies(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await RepliesTable.destroy({
        where: {
          id,
        },
      })
      return res.status(200).json({ deletedId: id })
    } catch (error) {
      return res.status(500).json({
        message: 'Error - deleteReplies',
      })
    }
  }
}

export default new MessagesController()
