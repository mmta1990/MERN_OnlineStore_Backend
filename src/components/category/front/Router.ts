import { Router } from 'express'
import Controller from './Controller'
const controller = new Controller()
const router: Router = Router()

router.get('/', controller.list)
router.get('/:slug/products', controller.products)

export default router
