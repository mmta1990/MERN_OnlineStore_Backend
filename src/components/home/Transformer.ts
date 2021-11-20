/* eslint-disable no-unused-vars */
import ITransformer from '../contracts/ITransformer'
import IProduct from '../product/model/IProduct'
import DateService from '../../services/DateService'
export default class ProductTransformer implements ITransformer<IProduct> {
    private readonly dateService:DateService
    constructor () {
      this.dateService = new DateService()
    }

    public transform (item:IProduct) {
      return {
        id: item._id,
        title: item.title,
        category: item.category,
        thumbnail: item.thumbnail,
        gallery: item.gallery,
        attributes: item.attributes,
        stock: item.stock,
        price: item.price,
        discountedPrice: item.discountedPrice
      }
    }

    public collection (items:IProduct[]) {
      return items.map((item:IProduct) => this.transform(item))
    }
}
