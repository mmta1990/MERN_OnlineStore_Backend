/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import ProductTransformer from './Transformer'
import IProductRepository from '../repositories/IProductRepository'
import ProductMongoRepository from '../repositories/ProductMongoRepository'
import NotFoundException from '../../exceptions/NotFoundException'
import CommentMongoRepository from '../../comments/repositories/CommentMongoRepository'
import CommentTransformer from '../../comments/CommentTransformer'
class ProductsController {
  private readonly productsRepository:IProductRepository
  private readonly productsTransformer:ProductTransformer
  constructor () {
    this.productsRepository = new ProductMongoRepository()
    this.productsTransformer = new ProductTransformer()

    this.list = this.list.bind(this)
    this.show = this.show.bind(this)
    this.comments = this.comments.bind(this)
  }

  public async list (req: Request, res: Response) {
    const perPage = 50
    const page = req.query.page || 1
    const offset = (page as number - 1) * perPage

    const allProducts = await this.productsRepository.findMany({}, undefined, { perPage, offset })
    res.send(this.productsTransformer.collection(allProducts))
  }

  public async show (req: Request, res: Response, next:NextFunction) {
    try {
      const { id } = req.params
      const singleProduct = await this.productsRepository.findOne(id, ['category'])
      if (!singleProduct) {
        throw new NotFoundException('محصول مورد نظر یافت نشد')
      }
      res.send(this.productsTransformer.transform(singleProduct))
    } catch (error) {
      next(error)
    }
  }

  public async comments (req: Request, res: Response, next:NextFunction) {
    const commentTransformer = new CommentTransformer()
    const commentsRepository = new CommentMongoRepository()
    try {
      const { id } = req.params
      const comments = await commentsRepository.findByProduct(id)
      res.send(commentTransformer.collection(comments))
    } catch (error) {
      next(error)
    }
  }
}

export default ProductsController
