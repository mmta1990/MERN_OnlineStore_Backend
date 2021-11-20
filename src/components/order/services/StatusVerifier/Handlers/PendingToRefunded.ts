import OrderStatus from '../../../model/OrderStatus'
import Handler from '../Handler'

export default class PendingToRefunded extends Handler {
  public process (newStatus:OrderStatus, oldStatus:OrderStatus):boolean {
    if (oldStatus === OrderStatus.PENDING && newStatus === OrderStatus.REFUNDED) {
      throw new Error('تغییر وضعیت سفارش از در حال بررسی به مرجوع شده امکان پذیر نمی باشد')
    }
    return true
  }
}
