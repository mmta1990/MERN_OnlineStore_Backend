import { Router } from 'express'
import Controller from './Controller'
const controller = new Controller()
const router: Router = Router()
import {auth} from '../../middlewares/Auth'
router.use(auth)
router.post('/',controller.purchaseOrder)
router.post('/verification',controller.verifyPayment)

export default router
