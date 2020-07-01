const mongoose     = require('mongoose')
const Schema       = mongoose.Schema

const reviewSchema = new Schema({
  rating: Number,
  headline: String,
  body: String,
  photo: String,
  productID: {type: Schema.Types.ObjectId, ref: "Product"},
  user: {type: Schema.Types.ObjectId, ref: "User"}
},{timestamps : true})

module.exports = mongoose.model('Review', reviewSchema)