import Order from 'src/components/order/model/Order'
import OrderStatus from '../../../model/OrderStatus'
import Handler from '../Handler'

export default class PendingToDelivered extends Handler {
  public process (newStatus:OrderStatus, oldStatus:OrderStatus):boolean {
    if (oldStatus === OrderStatus.PENDING && newStatus === OrderStatus.DELIVERED) {
      throw new Error('تغییر وضعیت سفارش از در حال بررسی به تحویل داده شد امکان پذیر نمی باشد')
    }
    return true
  }
}
