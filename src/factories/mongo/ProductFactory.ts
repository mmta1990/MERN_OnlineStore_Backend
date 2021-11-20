/* eslint-disable no-unused-vars */
import * as faker from 'faker'
import IProductAttribute from '../../components/product/model/IProductAttribute'
import IAttributeGroup from '../../components/product/model/IAttributeGroup'
import IProduct from '../../components/product/model/IProduct'
import ProductModel from '../../components/product/model/Product'
import { create as CreateCategory } from './CategoryFactory'
import IProductVariation, { IProductVariationItem } from 'src/components/product/model/IProductVariation'
import IPriceVariation from 'src/components/product/model/IPriceVariation'
import ICategory from 'src/components/category/model/ICategory'
import { max } from 'jalali-moment'
faker.setLocale('fa')
const makeProductAttributes = async (count:number = 1) => {
  const attributes:IProductAttribute[] = []
  for (let index = 1; index <= count; index++) {
    const title = faker.random.words(2)
    attributes.push({
      title,
      slug: faker.helpers.slugify(title),
      value: faker.random.words(2),
      filterable: faker.random.boolean(),
      hasPrice: faker.random.boolean()
    })
  }
  return attributes
}

const makeGroupAttribute = async (count:number = 1) => {
  const attributes:IAttributeGroup[] = []
  for (let index = 1; index <= count; index++) {
    const attributeItems = await makeProductAttributes(faker.random.number(15))
    attributes.push({
      title: faker.random.words(2),
      attributes: attributeItems
    })
  }
  return attributes
}
const makeVariationItems = async (count:number = 1) => {
  const variationItems:IProductVariationItem[] = []
  for (let index = 1; index <= count; index++) {
    variationItems.push({
      title: faker.random.word(),
      value: faker.random.word()
    })
  }
  return variationItems
}
const makeVariations = async (count:number = 1) => {
  const variations:IProductVariation[] = []
  for (let index = 1; index <= count; index++) {
    const items = await makeVariationItems(faker.random.number(10))
    variations.push({
      title: faker.random.words(2),
      name: faker.random.word(),
      type: faker.random.arrayElement(['color', 'size', 'material']),
      items
    })
  }
  return variations
}
const makePriceVariationItems = async (count:number = 1, variations:IProductVariation[]) => {
  const variationItems:object[] = []
  for (let index = 1; index <= count; index++) {
    const variation = faker.random.arrayElement(variations)
    if (variation) {
      const item = faker.random.arrayElement<IProductVariationItem>(variation.items)
      if (item) {
        variationItems.push({ [variation.name]: item.value })
      }
    }
  }
  return variationItems
}
const makePriceVariations = async (count:number = 1, variations:IProductVariation[]) => {
  const priceVariations:IPriceVariation[] = []

  for (let index = 1; index <= count; index++) {
    const items = await makePriceVariationItems(faker.random.number(10), variations)
    priceVariations.push({
      price: faker.commerce.price(undefined, undefined, 0) as unknown as number,
      items
    })
  }
  return priceVariations
}
const buildProduct = async (category:ICategory, attributes:IAttributeGroup[], variations:IProductVariation[], priceVariations:IPriceVariation[]) => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(undefined, undefined, 0),
    discountedPrice: faker.commerce.price(0, undefined, 0),
    thumbnail: faker.image.abstract(),
    gallery: [faker.image.abstract()],
    category: category._id,
    attributes,
    variations,
    priceVariations,
    stock: faker.random.number(100),
    purchased_count:faker.random.number(100),
    comments_count:faker.random.number(100),
    total_score:faker.random.number({min:0,max:5,precision:0.01}),
    views_count:faker.random.number(10000),
  }
}
export async function create (count:number = 1, params?:Partial<IProduct>) {
  const products:IProduct[] = []
  for (let index = 1; index <= count; index++) {
    // create category
    const categories = await CreateCategory(1)
    const attributes = await makeGroupAttribute(faker.random.number(15))
    const variations = await makeVariations(faker.random.number(10))
    const priceVariations = await makePriceVariations(faker.random.number(5), variations)
    const productParams = await buildProduct(categories[0], attributes, variations, priceVariations)
    const finalParams = { ...productParams, ...params }
    const newProduct = new ProductModel(finalParams)
    await newProduct.save()
    products.push(newProduct)
  }
  return products
}
