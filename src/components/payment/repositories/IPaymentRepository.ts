import IRepository from '../../contracts/IRepository'
import IPayment from '../model/IPayment'
export default interface IPaymentRepository extends IRepository<IPayment>{
    findByReserve(reserve:string):Promise<IPayment | null>
}
