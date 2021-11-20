import { Router } from 'express'
import Controller from './Controller'
const controller = new Controller()
const productRouter: Router = Router()

productRouter.get('/', controller.list)
productRouter.get('/:id', controller.show)
productRouter.get('/:id/comments', controller.comments)

export default productRouter
