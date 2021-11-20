import * as crypto from 'crypto'
export const buildAvatar = (email:string, size:number = 50) => {
  const hashedEmail:string = crypto.createHash('md5').update(email).digest('hex')
  return `https://www.gravatar.com/avatar/${hashedEmail}?s=${size}`
}
