import OrderStatus from '../../../model/OrderStatus'
import Handler from '../Handler'

export default class CanceledToRefunded extends Handler {
  public process (newStatus:OrderStatus, oldStatus:OrderStatus):boolean {
    if (oldStatus === OrderStatus.CANCELED && newStatus === OrderStatus.REFUNDED) {
      throw new Error('تغییر وضعیت سفارش از لغو شده به مرجوع شده امکان پذیر نمی باشد')
    }
    return true
  }
}
