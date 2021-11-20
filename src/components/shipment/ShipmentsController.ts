/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import IShipmentRepository from './repositories/IShipmentRepository'
import ShipmentMongoRepository from './repositories/ShipmentMongoRepository'
import ShipmentTransformer from './ShipmentTransformer'
export default class ShipmentsController {
    private readonly shipmentRepository:IShipmentRepository
    private readonly shipmentTransformer:ShipmentTransformer
    constructor () {
      this.shipmentRepository = new ShipmentMongoRepository()
      this.shipmentTransformer = new ShipmentTransformer()
      this.index = this.index.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction) {
      const shipments = await this.shipmentRepository.findMany({}, ['employee', 'order'])
      res.send(this.shipmentTransformer.collection(shipments))
    }
}
