/* eslint-disable no-unused-vars */
import * as faker from 'faker'
import SettingScope from '../../components/settings/model/SettingScope'
import ISetting from '../../components/settings/model/ISetting'
import SettingModel from '../../components/settings/model/Setting'
import { fake } from 'faker'
// faker.setLocale('fa')
export async function create (count:number = 1, params?:Partial<ISetting>) {
  const settings:ISetting[] = []
  for (let index = 1; index <= count; index++) {
    const defaultParams = {
      title: faker.random.word(),
      key: faker.random.word(),
      value: faker.random.word(),
      scope: faker.random.arrayElement([SettingScope.PRIVATE, SettingScope.PUBLIC]),
      version: faker.random.arrayElement(['1.0.0', '1.5.0', '2.0.0', '1.5.7', '2.5.0'])
    }
    const finalParams = { ...defaultParams, ...params }
    const newSetting = new SettingModel(finalParams)
    await newSetting.save()
    settings.push(newSetting)
  }
  return settings
}
