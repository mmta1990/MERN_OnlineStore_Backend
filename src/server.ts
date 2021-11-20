import { config as loadEnvironmentsVars } from 'dotenv'
import startMongoose from '../infrastructure/connections/mongoose'
import App from './app'
loadEnvironmentsVars()
startMongoose()
const port: number = process.env.APP_PORT as unknown as number
const application = new App(port)
application.start()
