const express = require('express');
const router = express.Router();
const Category = require('../models/category')

// post
router.post('/categories', async (req, res)=>{
  try {
    let category = new Category()
    category.type = req.body.type;
    await category.save()

    res.json({
      success: true,
      category: category
    })
  } catch (err) {
    res.status(500).json({
      err: err.message
    })
  }
})


module.exports = router;