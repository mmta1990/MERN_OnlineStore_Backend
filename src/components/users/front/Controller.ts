/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import User from '../model/User'
import IUserRepository from '../repositories/IUserRepository'
import UserMongoRepository from '../repositories/UserMongoRepository'
import {verify} from '../../../services/TokenService'
import ServerException from '../../exceptions/ServerException'
class UsersController {
  private readonly userRepository:IUserRepository
  constructor () {
    this.userRepository = new UserMongoRepository()
    this.saveAddress = this.saveAddress.bind(this)
  }

  public async saveAddress (req: Request, res: Response,next:NextFunction) {
    try {
          const { id } = verify(req.headers.authorization as string)
          const user = await this.userRepository.findOne(id)
          let newAddresses = []
          if(user?.addresses){
             newAddresses = [...user.addresses,{...req.body}]
          }else{
            newAddresses = [{...req.body}]
          }
          const result = await this.userRepository.updateOne({_id:id},{addresses:newAddresses})
          if(!result){
            throw new ServerException('امکان ذخیره سازی آدرس جدید در حال حاضر وجود ندارد')
          }
          res.send({
            success:true,
            message:'آدرس جدید با موفقیت ثبت شد'
          })

    } catch (error) {
        next(error)
    }
  }
}

export default UsersController
