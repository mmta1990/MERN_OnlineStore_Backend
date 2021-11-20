/* eslint-disable no-unused-vars */
import ICategory from '../model/ICategory'
import IRepository from '../../contracts/IRepository'
export default interface ICategoryRepository extends IRepository<ICategory>{
    findBySlug(slug:string):Promise<ICategory | null>

}
