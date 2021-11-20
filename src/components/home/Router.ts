import { Router } from 'express'
import Controller from './Controllre'
const controller = new Controller()
const router: Router = Router()

router.get('/', controller.list)

export default router
