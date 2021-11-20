import { Document } from 'mongoose'

export default interface IProductOffer extends Document {
    products: [object];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}
