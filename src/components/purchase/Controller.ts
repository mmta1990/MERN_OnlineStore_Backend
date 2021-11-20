/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import OrderService from '../order/OrderService'
import PaymentService from "../../services/payment/PaymentService";
import NotFoundException from '../exceptions/NotFoundException'
import { verify } from "../../services/TokenService";
import ServerException from '../exceptions/ServerException'
import IOrder from "../order/model/IOrder";
import IOrderRepository from '../order/repositories/IOrderRepository';
import OrderMongoRepository from '../order/repositories/OrderMongoRepository';
import IPaymentRepository from '../payment/repositories/IPaymentRepository';
import PaymentMongoRepository from '../payment/repositories/PaymentMongoRepository';
export default class OrdersController {
    private readonly orderService:OrderService
    private readonly paymentService:PaymentService
    private readonly paymentRepository:IPaymentRepository
    constructor () {
      this.orderService = new OrderService()
      this.paymentService = new PaymentService()
      this.paymentRepository = new PaymentMongoRepository()
      this.purchaseOrder = this.purchaseOrder.bind(this)
      this.verifyPayment = this.verifyPayment.bind(this)
    }

    public async purchaseOrder (req:Request, res:Response, next:NextFunction):Promise<void> {
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
          const paymentResult = await this.paymentService.payOrder(newOrder as IOrder,req.body.payment_method)
          res.send({
           ...paymentResult
          })
      } catch (error) {
        next(error)
      }
    }

    public async verifyPayment(req:Request,res:Response,next:NextFunction):Promise<void>{
      try {
          const paymentData = {
            authority:req.body.authority,
            status:req.body.status,
            reserve:req.body.reserve
          }
          const paymentVerifyResult = await this.paymentService.verifyPayment(paymentData)
          if(paymentVerifyResult.success){

            const payment = await this.paymentRepository.findByReserve(paymentData.reserve)
            this.orderService.completeOrder(payment?.order as string)
 
          }
          res.send(paymentVerifyResult)
      } catch (error) {
          next(error)
      }
    }
}
