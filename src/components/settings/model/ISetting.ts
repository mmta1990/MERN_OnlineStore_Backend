/* eslint-disable no-unused-vars */
import { Document } from 'mongoose'
import SettingScope from './SettingScope'

export default interface ISetting extends Document{
    title:string
    key:string
    value:string
    scope:SettingScope
    version:string
}
