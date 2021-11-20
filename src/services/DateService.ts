import * as moment from 'jalali-moment'
moment.locale('fa')
export default class DateService {
  public toPersian (input:string, format:string = 'YYYY/MM/DD HH:mm:ss'):string {
    return moment(input).format(format)
  }
}
