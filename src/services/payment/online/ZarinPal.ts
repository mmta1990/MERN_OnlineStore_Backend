import OnlineGateway from '../contracts/OnlineGateway'
import * as ZarinPalCheckout from 'zarinpal-checkout'
import IPaymentRequest from '../contracts/IPaymentRequest'
import IPaymentVerify from '../contracts/IPaymentVerify'
export default class ZarinPal implements OnlineGateway{
    public async paymentRequest(reqeust:IPaymentRequest):Promise<any>{
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const appFrontUrl = process.env.APP_FRONT_URL
        const zarinpal = ZarinPalCheckout.create(merchant as string,Number(sandbox)?true:false)
        const requestResult = await zarinpal.PaymentRequest({
            Amount: reqeust.amount, // In Tomans
            CallbackURL: `${appFrontUrl}/payment/verify/${reqeust.reserve}`,
            Description: reqeust.description,
            // Email: 'hi@siamak.work',
            // Mobile: '09120000000'
          })
          if(requestResult && requestResult.status === 100){
              return {
                  success:true,
                  url:requestResult.url
              }
          }
          return {
              success:false
          }
    }
    public async paymentVerify(verify:IPaymentVerify):Promise<any>{
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const zarinpal = ZarinPalCheckout.create(merchant as string,sandbox?true:false)
        const verifyResult = await zarinpal.PaymentVerification({
            Amount: verify.amount, // In Tomans
            Authority: verify.refID,
          })
          console.log({verifyResult})
          if(verifyResult && verifyResult.status === -21){
            return {
                success:false
            }
          }
          return {
            success:true,
            refID:verifyResult.RefID
        }
 
    }
}