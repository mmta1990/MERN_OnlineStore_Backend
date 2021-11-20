import IPaymentRepository from '../repositories/IPaymentRepository'
import PaymentMongoRepository from '../repositories/PaymentMongoRepository'
import { Request, Response, NextFunction } from 'express'
import gateways from '../../../config/gateways'
import IPayment from '../model/IPayment'
export default class PaymentsController {
    private readonly paymentRepository:IPaymentRepository
    constructor () {
      this.paymentRepository = new PaymentMongoRepository()
      this.gatewaysList = this.gatewaysList.bind(this)
    }
    public async gatewaysList(req:Request,res:Response,next:NextFunction){
        try {
            res.send({
              success:true,
              gateways
            })
        } catch (error) {
          res.send({
            success:false,
            message:'لیست درگاه های پرداخت در حال حاضر قابل دریافت نیست'
          })
        }
    }
}
