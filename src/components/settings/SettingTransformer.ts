/* eslint-disable no-unused-vars */
import ITransformer from '../contracts/ITransformer'
import ISetting from './model/ISetting'
export default class SettingTransformer implements ITransformer<ISetting> {
  public transform (item:ISetting) {
    return {
      id: item._id,
      title: item.title,
      settingKey: item.key,
      settingValue: item.value,
      scope: item.scope,
      version: item.version
    }
  }

  public collection (items:ISetting[]) {
    return items.map((item:ISetting) => this.transform(item))
  }
}
