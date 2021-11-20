/* eslint-disable no-unused-vars */
import IBasket from '../contracts/IBasket'
import IProduct from 'src/components/product/model/IProduct'
import redisConnection from '../../../../infrastructure/connections/redis'
import IBasketConfigurable from '../contracts/IBasketConfigurable'
export default class BasketRedisProvider implements IBasket, IBasketConfigurable {
    private key: string = '';
    public config (config: string): void {
      this.key = config
    }

    public add (product: IProduct): void {
      redisConnection.get(this.key)
        .then((result) => {
          if (result) {
            const items = JSON.parse(result as string)
            items.push(product)
            redisConnection.set(key, JSON.stringify(items))
              .then(result => { })
              .catch((error) => { })
          }
        }).catch((error) => {
          console.log(`redis can not fetch basket items : ${error.message}`)
        })
    }

    public remove (product: IProduct): void {
      redisConnection.get(this.key)
        .then((result) => {
          if (result) {
            const items = JSON.parse(result as string)
            items.splice(items.indexOf(product), 1)
            redisConnection.set(key, JSON.stringify(items))
              .then(result => { })
              .catch((error) => { })
          }
        }).catch((error) => {
          console.log(`redis can not fetch basket items : ${error.message}`)
        })
    }

    public async items (): Promise<IProduct[]> {
      const items = await this.getItems()
      return items
    }

    public async count (): Promise<number> {
      const items = await this.getItems()
      return items.length
    }

    public async total (): Promise<number> {
      const items = await this.getItems()
      return items.reduce((total: number, product: IProduct) => {
        return total + product.price
      }, 0)
    }

    public async has (product: IProduct): Promise<boolean> {
      const items = await this.getItems()
      return items.includes(product)
    }

    private async getItems (): Promise<IProduct[]> {
      const items = await redisConnection.get(this.key)
        .then((result) => result).catch((error) => false)
      if (items) {
        const decodedItems = JSON.parse(items as string)
        return decodedItems
      }
      return []
    }

    public clear (): void {
      redisConnection.del(this.key)
    }
}
