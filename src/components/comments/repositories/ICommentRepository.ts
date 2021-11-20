/* eslint-disable no-unused-vars */
import IRepository from 'src/components/contracts/IRepository'
import IComment from '../model/IComment'
export default interface ICommentRepository extends IRepository<IComment>{
     findByProduct(productID:string, relations?:string[]):Promise<IComment[]>
}
