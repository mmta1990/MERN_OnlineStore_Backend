/* eslint-disable no-unused-vars */
import ISettingRepository from './ISettingRepository'
import SettingModel from '../model/Setting'
import ISetting from '../model/ISetting'
export default class SettingMongoRepository implements ISettingRepository {
  public async findOne (ID:string):Promise<ISetting | null> {
    return SettingModel.findById(ID)
  }

  public async findMany (params:any):Promise<ISetting[]> {
    return SettingModel.find(params)
  }

  public async create (params:any):Promise<ISetting> {
    const newSetting = new SettingModel({ ...params })
    return newSetting.save()
  }

  public async updateOne (where:Partial<ISetting>, updateData:Partial<ISetting>):Promise<boolean> {
    return SettingModel.updateOne(where, updateData)
  }

  public async updateMany (where:any, updateData:any):Promise<any> {}
  public async deleteOne (where:any):Promise<any> {}
  public async deleteMany (where:any):Promise<any> {}
}
