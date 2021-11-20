import { Request, Response, NextFunction } from 'express'
import ProductMongoRepository from '../../product/repositories/ProductMongoRepository'
import NotFoundException from '../../exceptions/NotFoundException'
import Category from '../model/Category'
import CategoryMongoRepository from '../repositories/CategoryMongoRepository'
import ICategoryRepository from '../repositories/ICategoryRepository'
import * as _ from 'lodash'
class Controller {
  private readonly repository:ICategoryRepository
  constructor(){
    this.repository = new CategoryMongoRepository()
    this.list = this.list.bind(this)
    this.products = this.products.bind(this)
  }
  public async list (req:Request, res:Response, next:NextFunction) {
      try {
            const categories = await this.repository.findMany({},undefined,{perPage:40,offset:0})
            res.send({
              success:true,
              categories
            })
      } catch (error) {
        next(error)
      }
  }
  public async products (req:Request, res:Response, next:NextFunction) {
    try {
          const {slug} = req.params
          const category = await this.repository.findBySlug(slug)
          if(!category){
            throw new NotFoundException('دسته بندی مورد نظر یافت نشد')
          }
          const productsQuery:any = {
            category:category.id
          }
          const rawQuery = req.query
          delete rawQuery['slug']
          if(_.size(rawQuery) > 0){
              const titles:string[]= []
              const slugs:string[]=[]
              _.forEach(rawQuery,(value,key) => {
                const values = value as string
                titles.push(key)
                if(values.includes(',')){
                    slugs.push(...values.split(','))
                }else{
                  slugs.push(values)
                }
              })
              productsQuery["attributes.title"] = {$in:titles}
              productsQuery["attributes.attributes.slug"] = {$in:slugs}
          }
          const productRepository = new ProductMongoRepository()
          const products = await productRepository.findMany(productsQuery)
          res.send({
            success:true,
            products,
            category
          })
    } catch (error) {
      next(error)
    }
}
}

export default Controller
