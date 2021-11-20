import { Router } from 'express'
import Controller from './CouponsController'
const couponsController = new Controller()
const router: Router = Router()
router.get('/', couponsController.index)
router.post('/', couponsController.store)
export default router
