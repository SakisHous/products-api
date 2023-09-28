const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

require('dotenv').config()

const user = require('./routes/user.route')
const product = require('./routes/product.route')
const userProducts = require('./routes/userProducts.route')

mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => {console.log('Connection with the database established')},
    error => {console.log('Error. Connection failed', error)}
)

// config CORS
app.use(cors({
  // origin: '*',
  origin: ['http://localhost:3000', 'http://localhost:8000']
}))

app.use('/', express.static('files'))

app.use('/api/users', user)
// app.use('/api/products'. product)
app.use('/api/user-products', userProducts)

app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument.options)
)

app.listen(PORT, () =>{
  console.log(`Listening on PORT ${PORT}, http://localhost:${PORT}`)
})