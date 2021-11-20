export interface IProductVariationItem {
    title:string
    value:string
}
export default interface IProductVariation{
    title:string
    name:string
    type:string
    items:IProductVariationItem[]
}
