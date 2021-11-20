export default interface IAddOrder{
    items:any[]
    user_id:string
    coupon:{
        code:string,
        percent:number
    }
    delivery_address:any
    payment_method:string
}