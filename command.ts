import { config as loadEnvironmentsVars } from 'dotenv'
import startMongoose from './infrastructure/connections/mongoose'
import { Command } from 'commander'
import { create as userFactory } from './src/factories/mongo/UserFactory'
import { create as productFactory } from './src/factories/mongo/ProductFactory'
import { create as orderFactory } from './src/factories/mongo/OrderFactory'
import { create as commentFactory } from './src/factories/mongo/CommentFactory'
import { create as shipmentFactory } from './src/factories/mongo/ShipmentFactory'
import { create as paymentFactory } from './src/factories/mongo/PaymentFactory'
import { create as settingFactory } from './src/factories/mongo/SettingFactory'

const clear = require('clear')
const program = new Command()
loadEnvironmentsVars()
startMongoose()
clear()
program
  .version('v1.0.0')
  .description('A cli tool for shop project')
program
  .command('factory <model>')
  .description('Run models factory')
  .option('-c, --count <count>', 'count of records that must be created')
  .action((model, options) => {
    switch (model) {
      case 'user':
        userFactory(options.count)
          .then(users => {})
          .catch(error => {
            console.log(error.message)
          })
        break
      case 'product':
        productFactory(options.count)
          .then(products => {
            console.log(`${products.length} product has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
      case 'order':
        orderFactory(options.count)
          .then(orders => {
            console.log(`${orders.length} order has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
      case 'comment':
        commentFactory(options.count)
          .then(orders => {
            console.log(`${orders.length} comment has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
      case 'shipment':
        shipmentFactory(options.count)
          .then(orders => {
            console.log(`${orders.length} shipment has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
      case 'payment':
        paymentFactory(options.count)
          .then(orders => {
            console.log(`${orders.length} payment has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
      case 'setting':
        settingFactory(options.count)
          .then(orders => {
            console.log(`${orders.length} setting has been created successfully!`)
          })
          .catch(error => {
            console.log(error)
          })
        break
    }
  })
program.parse(process.argv)
