import type { Request, Response } from 'express'

class ForumController {
  getForum(req: Request, res: Response) {
    res.json({ forum: 'name' })
  }
}

export default new ForumController()
