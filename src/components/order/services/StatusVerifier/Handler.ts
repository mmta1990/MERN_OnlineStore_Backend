import OrderStatus from '../../model/OrderStatus'

export default abstract class Handler {
    private successor?:Handler | null = null
    constructor (successor:Handler | null = null) {
      this.successor = successor
    }

    public handle (newStatus:OrderStatus, oldStatus:OrderStatus):boolean {
      const result = this.process(newStatus, oldStatus)
      if (result && this.successor) {
        return this.successor.handle(newStatus, oldStatus)
      }
      return result
    }

    protected abstract process(newStatus:OrderStatus, oldStatus:OrderStatus):boolean
}
