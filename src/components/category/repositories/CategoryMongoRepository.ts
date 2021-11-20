/* eslint-disable no-unused-vars */
import ICategoryRepository from './ICategoryRepository'
import ICategory from '../model/ICategory'
import CategoryModel from '../model/Category'
import ObjectInterface from '../../contracts/ObjectInterface'
import IPagination from '../../contracts/IPagination'
export default class CategoryMongoRepository implements ICategoryRepository {
  public async findOne (ID:string):Promise<ICategory | null> {
    return CategoryModel.findById(ID)
  }
  public async findBySlug (slug:string):Promise<ICategory | null> {
    return CategoryModel.findOne({slug})
  }
  public async findMany (params:ObjectInterface,relations?:string[],pagination?:IPagination):Promise<ICategory[]> {
    const queryData:ObjectInterface = {}
    const categoryQuery = CategoryModel.find(queryData)
    if (relations && relations.length > 0) {
      relations.forEach((relation:string) => {
        categoryQuery.populate(relation)
      })
    }
    if (pagination) {
      categoryQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return categoryQuery.exec()
  }

  public async create (params:any):Promise<ICategory> {
    const newComment = new CategoryModel({ ...params })
    return newComment.save()
  }

  public async updateOne (where:Partial<ICategory>, updateData:Partial<ICategory>):Promise<boolean> {
    return CategoryModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
