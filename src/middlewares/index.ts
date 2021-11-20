/* eslint-disable no-unused-vars */
import { Application } from 'express'
import ExceptionHandler from './ExceptionHandler'
import NotFoundHandler from './NotFoundHandler'
export default function (app:Application) {
  ExceptionHandler(app)
  NotFoundHandler(app)
}
