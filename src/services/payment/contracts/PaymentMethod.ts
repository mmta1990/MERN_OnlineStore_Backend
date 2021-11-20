import IPayment from "../../../components/payment/model/IPayment";

export default interface PaymentMethod {
      doPayment(payment:IPayment):any
}