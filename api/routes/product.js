const express = require('express');
const router  = express.Router();
const Product = require('../models/product')
const upload  = require('../middlewares/uploadPhoto')
const cacheControl = require('express-cache-controller');

// post
router.post('/products', upload.array("photos",4), async (req, res) => {
  try {
    const files         = req.files.map(file => file.location)

    let product         = new Product();
    product.title       = req.body.title;
    product.description = req.body.description;
    product.price       = req.body.price;
    product.category    = req.body.category;
    product.photos.push(...files);

    await product.save()

    res.json({
      success: true,
      product: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

//get one
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({_id: req.params.id}).populate('category').populate('reviews','rating')

    res.json({
      success: true,
      product: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// get all

router.get('/products', async(req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// put cahnge only title
router.put('/products/:id', upload.array("photos",4), async(req, res)=>{
  try {
    let product = await Product.findOne({_id: req.params.id})

    if(req.body.title) product.title = req.body.title
    if(req.body.description) product.description = req.body.description
    if(req.body.price) product.price = req.body.price
    if(req.body.category) product.category = req.body.category
    if(req.files[0]) {
      let photos = req.files.map(file => file.location)
      product.photos = photos
    }

    await product.save()

    res.json({
      success: true,
      updatedProduct: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;
