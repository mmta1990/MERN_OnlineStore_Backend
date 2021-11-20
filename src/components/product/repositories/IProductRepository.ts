import IRepository from '../../contracts/IRepository'
import ProductStatus from '../model/productStatus'
import IProduct from '../model/IProduct'
export default interface IProductRepository extends IRepository<IProduct>{
    findByStatus(status:ProductStatus):Promise<IProduct[]>
}
