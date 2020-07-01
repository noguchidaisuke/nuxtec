const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Product = require('../models/product');
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../middlewares/uploadPhoto');

// post review
router.post('/reviews/:id', [upload.single("photo"), verifyToken], async (req, res) => {
  try {
    let review = new Review()

    if(req.file) review.photo     = req.file.location
    review.rating    = req.body.rating;
    review.headline  = req.body.headline;
    review.body      = req.body.body;
    review.productID = req.body.productID;
    review.user      = req.decoded._id

    const promiseProduct = Product.update({_id: req.params.id},{$push: {reviews: review._id}})
    const promiseReview = review.save();

    await Promise.all([promiseProduct, promiseReview])

    res.json({
      success: true,
      review: review
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      err: err.message
    })
  }
});

// get all product reviews

router.get('/reviews/:id', async (req, res) => {
  try {
    let reviews = await Review.find({productID: req.params.id}).populate('user', 'name').sort({"createdAt": -1})

    res.json({
      success: true,
      reviews: reviews
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message
    })
  }
})

module.exports = router;