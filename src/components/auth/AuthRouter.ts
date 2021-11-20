import { Router } from 'express'
import Controller from './AuthController'
const controller = new Controller()
const router: Router = Router()
router.post('/register', controller.register)
router.post('/login', controller.authenticate)
router.post('/check', controller.check)

export default router
