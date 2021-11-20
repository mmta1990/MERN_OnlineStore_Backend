import { Router } from 'express'
import UsersController from './UsersController'
const controller = new UsersController()
const usersRouter: Router = Router()

usersRouter.get('/', controller.index)
usersRouter.post('/', controller.create)
usersRouter.get('/store', controller.store)
export default usersRouter
