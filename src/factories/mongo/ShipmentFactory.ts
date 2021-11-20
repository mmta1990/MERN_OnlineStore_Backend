/* eslint-disable no-unused-vars */
import * as faker from 'faker'
import AdviceToBuy from '../../components/comments/model/AdviceToBuy'
import ShipmentStatus from '../../components/shipment/models/ShipmentStatus'

import IShipment from '../../components/shipment/models/IShipment'
import ShipmentModel from '../../components/shipment/models/Shipment'

import { create as createUser } from './UserFactory'
import { create as createOrder } from './OrderFactory'
faker.setLocale('fa')
export async function create (count:number = 1, params?:Partial<IShipment>) {
  const shipments:IShipment[] = []
  for (let index = 1; index <= count; index++) {
    const user = await createUser(1)
    const order = await createOrder(1)
    const defaultParams = {
      employee: user[0]._id,
      order: order[0]._id,
      selectedDateTime: faker.date.future(),
      deliveredAt: faker.date.future(),
      note: faker.random.arrayElement(['', faker.lorem.paragraph()]),
      status: faker.random.arrayElement([ShipmentStatus.ABSENT, ShipmentStatus.DELIVERED, ShipmentStatus.PENDING, ShipmentStatus.PICKED_UP])
    }
    const finalParams = { ...defaultParams, ...params }
    const newShipment = new ShipmentModel(finalParams)
    await newShipment.save()
    shipments.push(newShipment)
  }
  return shipments
}
