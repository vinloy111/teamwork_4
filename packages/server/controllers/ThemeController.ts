import type { Request, Response } from 'express'

class ThemeController {
  getCurrentTheme(req: Request, res: Response) {
    res.json({ message: 'black' })
  }
}

export default new ThemeController()
