import { Router } from 'express'
import Controller from './PaymentsController'
const paymentsController = new Controller()
const router: Router = Router()
router.get('/', paymentsController.index)
export default router
