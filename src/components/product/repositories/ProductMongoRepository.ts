/* eslint-disable no-unused-vars */
import IProductRepository from './IProductRepository'
import ProductModel from '../model/Product'
import ProductStatus from '../model/productStatus'
import IProduct from '../model/IProduct'
import IPagination from 'src/components/contracts/IPagination'
import ObjectInterface from 'src/components/contracts/ObjectInterface'
import { Types } from "mongoose";
export default class ProductMongoRepository implements IProductRepository {
  public async findOne (ID:string, relations?:string[]):Promise<IProduct | null> {
    const productQuery = ProductModel.findOne({ _id: ID })
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        productQuery.populate(relation)
      })
    }
    return productQuery.exec()
  }

  public async findMany (
    params:ObjectInterface,
    relations?:string[],
    pagination?:IPagination,
    sort?:any
  ):Promise<IProduct[]> {
    const productQueryParams:ObjectInterface = {...params}
    if(params.category){
      const objectID = Types.ObjectId
      productQueryParams.category  = new objectID(params.category)
    }
    const productQuery = ProductModel.find(productQueryParams)
    if(sort){
      productQuery.sort(sort)
    }
    if (pagination) {
      productQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return productQuery.exec()
  }

  public async findByStatus (status:ProductStatus):Promise<IProduct[]> {
    return ProductModel.find({ status })
  }

  public async create (params:any):Promise<IProduct> {
    const newProduct = new ProductModel({ ...params })
    return newProduct.save()
  }

  public async updateOne (where:Partial<IProduct>, updateData:Partial<IProduct>):Promise<boolean> {
    return ProductModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
