/* eslint-disable no-unused-vars */
import { model, Schema } from 'mongoose'
import IShipment from '../models/IShipment'
import ShipmentStatus from './ShipmentStatus'
const shipmentSchema:Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'User' },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  selectedDateTime: { type: Date, required: true },
  deliveredAt: { type: Date, default: null },
  note: { type: String, default: null },
  status: { type: ShipmentStatus, default: ShipmentStatus.PENDING }
})

export default model<IShipment>('Shipment', shipmentSchema)
