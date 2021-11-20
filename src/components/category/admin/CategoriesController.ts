import { Request, Response, NextFunction } from 'express'
import Category from '../model/Category'
class CategoriesController {
  public async store (req:Request, res:Response, next:NextFunction) {
    const newCategory = await Category.create({
      ...req.body
    })
    return res.send(newCategory)
  }

  public async list (req:Request, res:Response, next:NextFunction) {
    const categories = await Category.find({}, { title: 1, slug: 1 })
    return res.send(categories)
  }

  public async attributes (req:Request, res:Response, next:NextFunction) {
    const categoryID = req.params.id
    const category = await Category.findById(categoryID)
    if (category) {
      res.send(category.groups.map(group => {
        return {
          title: group.title,
          attributes: group.attributes
        }
      }))
    }
  }
}

export default CategoriesController
