import { Router } from 'express'
import Controller from './CommentsController'
const controller = new Controller()
const router: Router = Router()
router.get('/', controller.index)
export default router
