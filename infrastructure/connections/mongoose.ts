import * as monoogse from 'mongoose'

monoogse.connection.on('open', () => {
  console.log('mongo connection is open ...')
})
monoogse.connection.on('error', (error) => {
  console.log('failed to connect ', error.message)
})

const startMongoose = () => {
  monoogse.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false
    })
}

export default startMongoose
