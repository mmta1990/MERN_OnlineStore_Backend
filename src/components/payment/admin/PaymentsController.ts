import IPaymentRepository from '../repositories/IPaymentRepository'
import PaymentMongoRepository from '../repositories/PaymentMongoRepository'
import { Request, Response, NextFunction } from 'express'
import ITransformer from '../../contracts/ITransformer'
import PaymentTransformer from './PaymentTransformer'
import IPayment from '../model/IPayment'
export default class PaymentsController {
    private readonly paymentRepository:IPaymentRepository
    private readonly paymentTransformer:ITransformer<IPayment>
    constructor () {
      this.paymentRepository = new PaymentMongoRepository()
      this.paymentTransformer = new PaymentTransformer()
      this.index = this.index.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction) {
      const payments = await this.paymentRepository.findMany({}, ['user', 'order'])
      res.send(this.paymentTransformer.collection(payments))
    }
}
