/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import User from '../model/User'
import IUserRepository from '../repositories/IUserRepository'
import UserMongoRepository from '../repositories/UserMongoRepository'
import UserTransformer from './UserTransformer'

class UsersController {
  private readonly userRepository:IUserRepository
  private readonly userTransformer:UserTransformer
  constructor () {
    this.userRepository = new UserMongoRepository()
    this.userTransformer = new UserTransformer()
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
  }

  public async index (req: Request, res: Response) {
    const users = await this.userRepository.findMany({})
    res.send(this.userTransformer.collection(users))
  }

  public async create (req: Request, res: Response) {
    // const newUser = await User.create({
    //   firstName: 'Kayvan',
    //   lastName: 'Alimohammadi',
    //   email: 'a@a.com',
    //   mobile: '09123456789',
    //   wallet: 0,
    //   totalOrders: 0,
    //   createdAt: Date.now(),
    //   addresses: []
    // })
    // newUser.addresses.push({
    //   title: 'خانه',
    //   state: 'تهران',
    //   city: 'تهران',
    //   address: 'خیابان فلان کوچه فلان',
    //   zipCode: '1234567890',
    //   fullName: 'مشتری فلان',
    //   mobile: '09123456789 '
    // })
    // await newUser.save()
    // res.send({ newUser })
  }

  public async store (req:Request, res:Response, next:NextFunction) {
    try {
      const value = Math.random()
      if (value > 0.5) {
        throw new Error('this request can not be executed!')
      }
      res.send({
        success: true,
        message: 'ok'
      })
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
