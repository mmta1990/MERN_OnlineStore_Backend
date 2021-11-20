/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import IAttributeCategory from './IAttributeCategory'
export default interface ICategory extends Document {
    title: string;
    slug:string;
    groups: IAttributeCategory[];
}
