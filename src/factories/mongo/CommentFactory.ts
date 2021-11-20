/* eslint-disable no-unused-vars */
import * as faker from 'faker'
import AdviceToBuy from '../../components/comments/model/AdviceToBuy'
import CommentStatus from '../../components/comments/model/CommentStatus'

import IComment from '../../components/comments/model/IComment'
import CommentModel from '../../components/comments/model/Comment'

import { create as createUser } from './UserFactory'
import { create as createProduct } from './ProductFactory'
faker.setLocale('fa')
export async function create (count:number = 1, params?:Partial<IComment>) {
  const comments:IComment[] = []
  for (let index = 1; index <= count; index++) {
    const user = await createUser(1)
    const product = await createProduct(1)
    const defaultParams = {
      user: user[0]._id,
      product: product[0]._id,
      title: faker.lorem.words(5),
      body: faker.lorem.paragraph(),
      isBuyer: faker.random.boolean(),
      adviceToBuy: faker.random.arrayElement([AdviceToBuy.YES, AdviceToBuy.NO, AdviceToBuy.NOT_SURE]),
      status: faker.random.arrayElement([CommentStatus.APPROVED, CommentStatus.PENDING, CommentStatus.REJECTED])
    }
    const commentParams = { ...defaultParams, ...params }
    const newComment = new CommentModel(commentParams)
    await newComment.save()
    comments.push(newComment)
  }
  return comments
}
