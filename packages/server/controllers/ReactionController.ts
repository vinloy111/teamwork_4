import type { Request, Response } from 'express'
import { Reaction } from '../init'

class ReactionController {
  async getReactions(req: Request, res: Response): Promise<Response> {
    try {
      const { topicId } = req.params

      const reactions = await Reaction.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - getReactions',
        error,
      })
    }
  }
  async addReaction(req: Request, res: Response) {
    try {
      const { userId, emojiId, topicId } = req.body

      await Reaction.create({ userId, emojiId, topicId })
      const reactions = await Reaction.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - addReaction',
        error,
      })
    }
  }
  async updateReaction(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { userId, emojiId, topicId } = req.body

      await Reaction.update(
        { userId, emojiId, topicId },
        {
          where: { id },
        }
      )
      const reactions = await Reaction.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateReaction',
        error,
      })
    }
  }
  async deleteReaction(req: Request, res: Response) {
    try {
      const { id, topicId } = req.params

      const item = await Reaction.findOne({
        where: { id },
      })
      await item?.destroy()
      const reactions = await Reaction.findAll({
        where: {
          topicId,
        },
      })

      return res.status(200).json(reactions)
    } catch (error) {
      return res.status(500).json({
        message: 'Error - updateReaction',
        error,
      })
    }
  }
}

export const reactionController = new ReactionController()
