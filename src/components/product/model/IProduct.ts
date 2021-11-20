/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import ProductStatus from './productStatus'
import IAttributeGroup from './IAttributeGroup'
import IPriceVariation from './IPriceVariation'
import IProductVariation from './IProductVariation'
export default interface IProduct extends Document {
    title: string
    price: number
    discountedPrice: number
    thumbnail?: string
    thumbnailUrl?:string
    gallery?: string[]
    galleryUrl?: string[]
    category: string
    attributes: IAttributeGroup[]
    variations:IProductVariation[]
    priceVariations:IPriceVariation[]
    createdAt: Date
    updatedAt: Date
    stock: number
    purchased_count:number
    comments_count:number
    total_score:number
    views_count:number
    status: ProductStatus
}
