const express = require('express');
const router = express.Router();
const Address = require('../models/address')
const User = require('../models/user')
const verifyToken = require('../middlewares/verifyToken')

// アドレス保存　＋　ユーザー
router.post('/addresses',verifyToken, async (req, res) => {
  try {
    const address = new Address();

    address.user = req.decoded._id
    address.country = req.body.country
    address.state = req.body.state
    address.address = req.body.address
    address.zipCode = req.body.zipCode
    address.phoneNumber = req.body.phoneNumber
    address.name = req.body.name

    await address.save()
    await User.update({_id: req.decoded._id}, {$set: {address: address}})

    res.json({
      success: true,
      message: "Success Address register"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// paymentページで読み込む。　初期値代入。
router.get('/addresses', verifyToken, async (req, res)=>{
  try {
    const user = await User.findOne({_id: req.decoded._id}).populate('address');
    const newAddress = new Address();
    const address = user.address ? user.address : newAddress
    res.json({
      success: true,
      address: address
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


module.exports = router;