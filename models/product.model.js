const mongoose = require('mongoose')

const Schema = mongoose.Schema

let productSchema = new Schema({
  product: {
    type: String,
    required: true,
    unique: true
  },
  cost: { type: Number },
  description: { type: String },
  quantity: { type: Number, required: true }
},
{
  collection: 'products',
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)