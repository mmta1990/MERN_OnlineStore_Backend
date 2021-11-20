/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import ProductTransformer from './Transformer'
import IProductRepository from '../product/repositories/IProductRepository'
import ProductMongoRepository from '../product/repositories/ProductMongoRepository'
 class HomeController {
  private readonly productsRepository:IProductRepository
  private readonly productsTransformer:ProductTransformer
  constructor () {
    this.productsRepository = new ProductMongoRepository()
    this.productsTransformer = new ProductTransformer()
    this.list = this.list.bind(this)
  }

  public async list (req: Request, res: Response) {
    const newests = await this.productsRepository.findMany(
      {},// filter by published status
      undefined,
      { perPage:3, offset:0 },
      {createdAt:-1}
      )
      const bestSellers = await this.productsRepository.findMany(
        {},// filter by published status
        undefined,
        { perPage:3, offset:0 },
        {purchased_count:-1}
        )
      const mostViewed = await this.productsRepository.findMany(
        {},// filter by published status
        undefined,
        { perPage:3, offset:0 },
        {views_count:-1}
        )
        const populars = await this.productsRepository.findMany(
          {},// filter by published status
          undefined,
          { perPage:3, offset:0 },
          {total_score:-1}
          )
        res.send({
          newests:this.productsTransformer.collection(newests),
          best_sellers:this.productsTransformer.collection(bestSellers),
          most_viewed:this.productsTransformer.collection(mostViewed),
          populars:this.productsTransformer.collection(populars),
        })
  }
}

export default HomeController
