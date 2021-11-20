import { Router } from 'express'
import Controller from './Controller'
const paymentsController = new Controller()
const router: Router = Router()
router.get('/gateways', paymentsController.gatewaysList)
export default router
