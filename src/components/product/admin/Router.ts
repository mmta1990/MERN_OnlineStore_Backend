import { Router } from 'express'
import ProductsController from './Controller'
const productsControllerInstance = new ProductsController()
const productRouter: Router = Router()

productRouter.get('/', productsControllerInstance.index)
productRouter.post('/', productsControllerInstance.create)

export default productRouter
