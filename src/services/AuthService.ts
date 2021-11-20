/* eslint-disable no-unused-vars */
import IUser from 'src/components/users/model/IUser'
import IUserRepository from '../components/users/repositories/IUserRepository'
import UserMongoRepository from '../components/users/repositories/UserMongoRepository'
import { hashPassword } from '../services/HashService'
import { comparePassword } from './HashService'
class AuthService {
    private readonly usersRepository:IUserRepository
    constructor () {
      this.usersRepository = new UserMongoRepository()
    }

    public async authenticate (email:string, password:string):Promise<IUser|boolean> {
      const user = await this.usersRepository.findByEmail(email)
      if (user === null) {
        return false
      }
      const passwordCheck = comparePassword(password, user.password)
      if (passwordCheck) {
        return user
      }
      return false
    }

    public async register (firstName:string, lastName:string, email:string, password:string) {
      const hashedPassword :string = hashPassword(password)
      const newUser = await this.usersRepository.create({ firstName, lastName, email, password: hashedPassword })
      if (!newUser) {
        return false
      }
      return true
    }
}
export default AuthService
