/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import AdviceToBuy from './AdviceToBuy'
import CommentStatus from './CommentStatus'

export default interface IComment extends Document{
    user:string
    product:string
    title:string
    body:string
    createdAt:Date
    isBuyer:boolean
    adviceToBuy:AdviceToBuy
    status:CommentStatus
}
