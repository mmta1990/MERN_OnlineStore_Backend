import OrderStatus from '../../model/OrderStatus'
import CanceledToRefunded from './Handlers/CanceledToRefunded'
import PendingToDelivered from './Handlers/PendingToDelivered'
import PendingToRefunded from './Handlers/PendingToRefunded'

export default class StatusVerifier {
  public verify (newStatus:OrderStatus, oldStatus:OrderStatus):boolean {
    const canceledToRefunded:CanceledToRefunded = new CanceledToRefunded()
    const pendingToDelivered:PendingToDelivered = new PendingToDelivered(canceledToRefunded)
    const pendingToRefunded:PendingToRefunded = new PendingToRefunded(pendingToDelivered)
    return pendingToRefunded.handle(newStatus, oldStatus)
  }
}
