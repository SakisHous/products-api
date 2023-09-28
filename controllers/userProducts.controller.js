const User = require('../models/user.model')

exports.findAll = async (req, res) => {
  console.log("Find all products bought by all users")

  try {
    const results = await User.find({}, {username: 1, products: 1})
    
    res.status(200).json({status: true, data: results})
    console.log('Successfully retrieving all products')
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in retrieving all products:\n ${err}`)
  }
}

exports.findOne = async (req, res) => {
  const username = req.params.username
  console.log(`Find user's products with username: ${username}`)

  try {
    const result = await User.findOne({username: username}, {username: 1, products: 1})

    res.status(200).json({status: true, data: result})
    console.log(`Success in reading user's product`)
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in finding users's products\n ${err}`)
  }
}

exports.addProduct = async (req, res) => {
  const { username, products } = req.body
  console.log(`Insert a product to user with username: ${username}`)

  try {
    const result = await User.updateOne(
      {username: username},
      {
        $push: {products: products}
      }
    )
    res.status(200).json({status: true, data: result})
    console.log('Successfully saving product')
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in saving product\n ${err}`)
  }
}

exports.updateProduct = async (req, res) => {
  const username = req.params.username
  const productId = req.params.product._id
  const productQuantity = req.params.product.quantity

  console.log(`Update product for user with username: ${username}`)

  try {
    const result = await User.updateOne(
      {username: username, "products._id": productId},
      {
        $set: {"products.$.quantity": productQuantity}
      }
    )

    res.status(200).json({status: true, data: result})
    console.log("Successful product's quantity was updated")

  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in finding users's products\n ${err}`)
  }
}

exports.deleteProduct = async (req, res) => {
  const { username, productName: product } = req.params

  console.log(`Delete product with product name: ${productName}`)

  try {
    const result = await User.updateOne(
      {username: username, "products.product": product_name},
      {
        $pull: {products: {product: product}}
      }
    )

    res.status(200).json({status: true, data: result})
    console.log('Success in deleting product')

  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in deleting product\n ${err}`)
  }
}

exports.stats1 = async (req, res) => {
  console.log('For all users sum by product and count')

  try {
    const result = await User.aggregate([
      { $unwind: "$products" },
      { $project: {id: 1, username: 1, products: 1} },
      { $group: 
        { 
          _id: {username: username, product: products.product},
          totalAmount: { $sum: {$multiple: ["$products.cost", "$products.quantity"]} },
          
        },
        count: { $sum: 1 }
      }
    ])
    
    res.status(200).json({status: true, data: result})
    console.log("Successful stats1 are displayed")
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Error in stats1\n ${err}`)
  }
}
