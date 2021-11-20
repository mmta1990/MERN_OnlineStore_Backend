import { Router } from 'express'
import Controller from './CategoriesController'
const categoriesController = new Controller()
const router: Router = Router()

router.post('/', categoriesController.store)
router.get('/', categoriesController.list)
router.get('/:id/attributes', categoriesController.attributes)

export default router
