const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const verifyToken = require('../middlewares/verifyToken')

router.get('/orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({receiver: req.decoded._id}).populate('products.productID')
    res.json({
      success: true,
      orders
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


module.exports = router;