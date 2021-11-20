import { Router } from 'express'
import ShipmentsController from './ShipmentsController'
const controller = new ShipmentsController()
const shipmentRouter: Router = Router()
shipmentRouter.get('/', controller.index)
export default shipmentRouter
