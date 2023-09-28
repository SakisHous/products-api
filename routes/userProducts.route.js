const express = require('express')
const router = express.Router()

const userProductsController = require('../controllers/userProducts.controller')

router.get('/', userProductsController.findAll)
router.get('/stats1', userProductsController.stats1)
router.get('/:username', userProductsController.findOne)
router.post('/', userProductsController.addProduct)
router.patch('/:username', userProductsController.updateProduct)
router.delete('/:username/products/:product', userProductsController.deleteProduct)


module.exports = router