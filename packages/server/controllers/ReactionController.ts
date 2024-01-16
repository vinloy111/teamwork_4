import type { Request, Response } from 'express'
import { ReactionTable } from '../init'

class ReactionController {
  async getReactions(req: Request, res: Response): Promise<Response> {
    try {
      const { topicId } = req.params

      const reactions = await ReactionTable.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getReactions',
      })
    }
  }
  async addReaction(req: Request, res: Response) {
    try {
      const { userId, emojiId, topicId } = req.body

      await ReactionTable.create({ userId, emojiId, topicId })
      const reactions = await ReactionTable.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - addReaction',
      })
    }
  }
  async updateReaction(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { userId, emojiId, topicId } = req.body

      await ReactionTable.update(
        { userId, emojiId, topicId },
        {
          where: { id },
        }
      )
      const reactions = await ReactionTable.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateReaction',
      })
    }
  }
  async deleteReaction(req: Request, res: Response) {
    try {
      const { id, topicId } = req.params

      const item = await ReactionTable.findOne({
        where: { id },
      })
      await item?.destroy()
      const reactions = await ReactionTable.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateReaction',
      })
    }
  }
}

export const reactionController = new ReactionController()
