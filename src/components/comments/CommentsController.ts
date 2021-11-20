/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import CommentTransformer from './CommentTransformer'
import CommentMongoRepository from './repositories/CommentMongoRepository'
import ICommentRepository from './repositories/ICommentRepository'

export default class CommentsController {
    private readonly commentsRepository:ICommentRepository
    private readonly transformer:CommentTransformer
    constructor () {
      this.commentsRepository = new CommentMongoRepository()
      this.transformer = new CommentTransformer()
      this.index = this.index.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction) {
      const comments = await this.commentsRepository.findMany({}, ['user', 'product'])
      res.send(this.transformer.collection(comments))
    }
}
