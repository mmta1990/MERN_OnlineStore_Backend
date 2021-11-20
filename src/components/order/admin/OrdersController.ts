/* eslint-disable no-unused-vars */
import IOrderRepository from '../repositories/IOrderRepository'
import OrderMongoRepository from '../repositories/OrderMongoRepository'
import { NextFunction, Request, Response } from 'express'
import OrderTransformer from './OrderTransformer'
import IOrder from '../model/IOrder'
import OrderService from '../OrderService'
import NotFoundException from '../../exceptions/NotFoundException'
export default class OrdersController {
    private readonly ordersRepository:IOrderRepository
    private readonly orderTransformer:OrderTransformer
    private readonly orderService:OrderService
    constructor () {
      this.ordersRepository = new OrderMongoRepository()
      this.orderTransformer = new OrderTransformer()
      this.orderService = new OrderService()
      this.index = this.index.bind(this)
      this.find = this.find.bind(this)
      this.updateStatus = this.updateStatus.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction):Promise<void> {
      try {
        const perPage = 50
        const page = req.query.page || 1
        const offset = (page as number - 1) * perPage
        const orders = await this.ordersRepository.findMany({
          user_data: req.query.keyword as string
        }, ['user', 'coupon'], {
          perPage,
          offset
        })
        const totalOrders = await this.ordersRepository.findMany({
          user_data: req.query.keyword as string
        })
        const transformedOrders = this.orderTransformer.collection(orders)
        res.send({
          data: transformedOrders,
          _metadata: {
            page,
            perPage,
            totalPages: Math.ceil(totalOrders.length / perPage),
            totalItems: totalOrders.length
          }
        })
      } catch (error) {
        next(error)
      }
    }

    public async find (req:Request, res:Response, next:NextFunction):Promise<void> {
      try {
        const order = await this.ordersRepository.findOne(req.params.orderID, ['user', 'coupon', 'orderLines.product'])
        if (!order) {
          throw new NotFoundException('سفارش مورد نظر یافت نشد')
        }
        res.send(this.orderTransformer.transform(order as IOrder))
      } catch (error) {
        next(error)
      }
    }

    public async updateStatus (req:Request, res:Response, next:NextFunction):Promise<void> {
      this.orderService.updateStatus(req.params.orderID, req.body.orderStatus)
        .then(result => {
          if (result) {
            res.send({
              success: true,
              message: 'عملیات به روز رسانی با موفقیت انجام شد'
            })
          }
        })
        .catch(next)
    }
}
