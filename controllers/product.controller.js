const Product = require("../models/product.model")

const logger = require('../logger/logger')

exports.findAll = async (req, res) => {
  console.log(`Find all product in MongoDB database`)

  try {
    const results = await Product.find()

    res.status(200).json({status: true, data: results})
  } catch(err) {
    console.log(`Error in retrieving all products from the database \n ${err}`)
    res.status(400).json({status: false, data: err})
  }

}

exports.findOne = async (req, res) => {
  const id = req.params.id
  console.log(`Find a product with id= ${id}`)

  try {
    const result = await Product.findOne({_id: id})

    res.status(200).json({status: true, data: result})
  } catch(err) {
    console.log(`Error in retrieving one product given id \n ${err}`)
    res.status(400).json({status: false, data: err})
  }
}

exports.create = async (req, res) => {
  const product = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  })

  console.log(`Insert new product in the database`)

  try {
    const result = await product.save()
    res.status(200).json({status: true, data: result})
    console.log('Successfully inserting new product')
  } catch(err) {
    console.log(`Error in inserting new product \n ${err}`)
    res.status(400).json({status: false, data: err})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  console.log(`Updating product with id= ${id}`)

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  }

  try {
    const result = await Product.findOneAndUpdate({_id: id}, updateProduct, {new: true})
    res.status(200).json({status: true, data: result})
    console.log(`Success updating product`)
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Problem updating product with id= ${req.body.id}`)
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  console.log(`Delete product with id= ${id}`)

  try {
    const result = await Product.findOneAndRemove({_id: id})
    res.status(200).json({status: true, data: result})
    console.log(`Success deleting product`)
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Problem deleting product with id= ${id}`)
  }

}