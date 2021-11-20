/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import IOrderRepository from '../repositories/IOrderRepository'
import OrderMongoRepository from '../repositories/OrderMongoRepository'
import IOrder from '../model/IOrder'
import OrderService from '../OrderService'
import NotFoundException from '../../exceptions/NotFoundException'
import { verify } from "../../../services/TokenService";
import ServerException from '../../exceptions/ServerException'
import ITransformer from '../../contracts/ITransformer'
import Transformer from './Transformer'
export default class OrdersController {
    private readonly ordersRepository:IOrderRepository
    private readonly orderService:OrderService
    private readonly transformer:ITransformer<IOrder>
    constructor () {
      this.ordersRepository = new OrderMongoRepository()
      this.orderService = new OrderService()
      this.transformer = new Transformer()
      this.store = this.store.bind(this)
      this.list = this.list.bind(this)
    }

    public async store (req:Request, res:Response, next:NextFunction):Promise<void> {
      try {
          const {id} = verify(req.headers.authorization as string)
          const orderData = {
            items:[...req.body.basket],
            user_id:id,
            coupon:req.body.coupon,
            delivery_address:req.body.delivery_address,
          }
          const newOrder = await  this.orderService.addOrder(orderData)
          if(!newOrder){
            throw new ServerException('در حال حاضر امکان ثبت سفارش وجود ندارد')
          }
          res.send({
            success:true
          })
      } catch (error) {
        next(error)
      }
    }
    public async list (req:Request, res:Response, next:NextFunction):Promise<void>{
      try {
        const {id} = verify(req.headers.authorization as string)
        const userOrders = await this.ordersRepository.findMany({user:id},undefined,{perPage:50,offset:0})
        res.send({
          success:true,
          orders:this.transformer.collection(userOrders)
        })
      } catch (error) {
        next(error)
      }
    }
}
