import { Router } from 'express'
import Controller from './OrdersController'
const ordersController = new Controller()
const router: Router = Router()
router.get('/', ordersController.index)
router.get('/:orderID', ordersController.find)
router.patch('/:orderID', ordersController.updateStatus)
export default router
