import { Router } from 'express'
import Controller from './SettingsController'
const controller = new Controller()
const router: Router = Router()
router.get('/', controller.index)
router.post('/', controller.store)
export default router
