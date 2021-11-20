/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import ISettingRepository from './repositories/ISettingRepository'
import SettingMongoRepository from './repositories/SettingMongoRepository'
import SettingTransformer from './SettingTransformer'

export default class SettingsController {
    private readonly settingRepository:ISettingRepository
    private readonly settingTransformer:SettingTransformer
    constructor () {
      this.settingRepository = new SettingMongoRepository()
      this.settingTransformer = new SettingTransformer()
      this.index = this.index.bind(this)
      this.store = this.store.bind(this)
    }

    public async index (req:Request, res:Response, next:NextFunction) {
      const settings = await this.settingRepository.findMany({})
      res.send(this.settingTransformer.collection(settings))
    }

    public async store (req:Request, res:Response, next:NextFunction) {
      try {
        const newSetting = await this.settingRepository.create({
          title: req.body.title,
          key: req.body.key,
          value: req.body.value,
          scope: req.body.scope as unknown as number,
          version: req.body.version
        })
        if (newSetting) {
          res.send({
            success: true,
            message: 'تنظیمات جدید با موفقیت ایجاد شد'
          })
        }
      } catch (error) {
        next(error)
      }
    }
}
