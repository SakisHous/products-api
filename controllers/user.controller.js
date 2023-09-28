const User = require('../models/user.model')

const logger = require('../logger/logger')

exports.findAll = async (req, res) => {
  console.log("Find all users")

  try {
    const result = await User.find()
    res.status(200).json({status: true, data: result})
    logger.info("[Info]: Success in reading all users")
    // logger.log("[Logger Info]: Success in reading all users")
  } catch (err) {
    res.status(400).json({status: false, data: err})
    console.log(err)
    logger.error("[Error]: Retrieving all users from the database")
  }
}

exports.findOne = async (req, res) => {
  const username = req.params.username
  console.log("Find user with username")

  try {
    const result = await User.findOne({username: username})
    res.status(200).json({status: true, data: result})
  } catch (err) {
    res.status(400).json({status: false, data: err})
  }

}

exports.create = async (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products
  })

  console.log(`Inserting user with username: ${req.body.username}`)

  try {
    const result = await user.save()
    res.status(200).json({status: true, data: result})
    console.log(`Success inserting user`)
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Problem inserting user with username: ${req.body.username}`)
  }
}

exports.update = async (req, res) => {
  const username = req.body.username

  console.log(`Update user with username: ${username}`)

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  }

  try {
    const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true})
    res.status(200).json({status: true, data: result})
    console.log(`Success updating user`)
  } catch(err) {
    res.status(400).json({status: false, data: err})
    console.log(`Problem updating user with username: ${req.body.username}`)
  }
}

exports.delete = async (req, res) => {
  const username = req.params.username
  console.log(`Delete user with username: ${username}`)

  try {
    const result = await User.findOneAndRemove({username: username})
    res.status(200).json({status: true, data: result})
    console.log(`Success deleting user`)
  } catch (err) {
    res.status(400).json({status: false, data: err})
    console.log(`Problem deleting user with username: ${username}`)
  }
}

// module.exports = { findAll }