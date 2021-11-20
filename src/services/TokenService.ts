import * as jwt from 'jsonwebtoken'
export const sign = (data:any) => {
  return jwt.sign(data, process.env.APP_SECRET as string)
}
export const verify = (token:string):any => {
  try {
    return jwt.verify(token, process.env.APP_SECRET as string)
  } catch (error) {
    return false
  }
}
