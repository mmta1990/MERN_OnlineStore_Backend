import { Router } from 'express'
import Controller from './Controller'
const ordersController = new Controller()
const router: Router = Router()
import {auth} from '../../../middlewares/Auth'
router.use(auth)
router.post('/',ordersController.store)
router.get('/',ordersController.list)
export default router
