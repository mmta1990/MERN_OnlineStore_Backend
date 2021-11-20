import ITransformer from '../contracts/ITransformer'
import IComment from './model/IComment'
import DateService from '../../services/DateService'
import { buildAvatar } from '../../services/AvatarService'
export default class CommentTransformer implements ITransformer<IComment> {
        private readonly dateService:DateService
        constructor () {
          this.dateService = new DateService()
        }

        public transform (item:IComment) {
          return {
            id: item._id,
            user: this.getUser(item.user),
            product: this.getProduct(item.product),
            title: item.title,
            body: item.body,
            isBuyer: item.isBuyer,
            adviceToBuy: item.adviceToBuy,
            createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
            status: item.status
          }
        }

        private getUser (user: any) {
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: buildAvatar(user.email)
          }
        }

        private getProduct (product: any) {
          return {
            id: product._id,
            title: product.title
          }
        }

        public collection (items:IComment[]) {
          return items.map((item:IComment) => this.transform(item))
        }
}
