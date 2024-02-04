import { Router } from 'express'
import forumRoutes from './forumRoutes'
import themeRoutes from './themeRoutes'
import reactionRoutes from './reactionRoutes'

const routes: Router = Router()

forumRoutes(routes)
themeRoutes(routes)
reactionRoutes(routes)

export default routes
