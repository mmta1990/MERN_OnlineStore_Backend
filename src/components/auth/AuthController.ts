import { Request, Response, NextFunction } from 'express'
import AuthService from '../../services/AuthService'
import NotFoundException from '../exceptions/NotFoundException'
import ServerException from '../exceptions/ServerException'
import { sign, verify } from '../../services/TokenService'
import User from '../users/model/User'
import IUser from '../users/model/IUser'
import ValidationException from '../exceptions/ValidationException'
import UserTransformer from '../users/admin/UserTransformer'
class AuthController {
    private readonly authService:AuthService
    constructor () {
      this.authenticate = this.authenticate.bind(this)
      this.register = this.register.bind(this)
      this.check = this.check.bind(this)
      this.authService = new AuthService()
    }

    public async authenticate (req:Request, res:Response, next:NextFunction) {
      const userTransformer = new UserTransformer()
      try {
        const { email, password } = req.body
        const user = await this.authService.authenticate(email, password)
        if (!user) {
          throw new NotFoundException('اطلاعات ورود صحیح نمی باشد')
        }
        let id:string = ''
        if (user instanceof User) {
          id = user.id
        }
        res.send({
          success: true,
          message: 'ورود با موفقیت انجام شد',
          user: userTransformer.transform(user as IUser),
          token: sign({ id })
        })
      } catch (error) {
        next(error)
      }
    }

    public async register (req:Request, res:Response, next:NextFunction) {
      try {
        const { firstName, lastName, email, password } = req.body
        const registerResult = await this.authService.register(firstName, lastName, email, password)
        if (!registerResult) {
          throw new ServerException('فرآیند ثبت نام به خطایی مواجه شد.بعدا سعی کنید')
        }
        res.send({
          success: true,
          message: 'ثبت نام با موفقیت انجام شد'
        })
      } catch (error) {
        next(error)
      }
    }

    public async check (req:Request, res:Response, next:NextFunction) {
      try {
        const { authToken } = req.body
        const verifyResult = verify(authToken)
        if (!verifyResult) {
          throw new ValidationException('provided token is not valid!')
        }
        res.send({
          success: true,
          message: 'token is valid'
        })
      } catch (error) {
        next(error)
      }
    }
}
export default AuthController
