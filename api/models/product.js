const mongoose  = require('mongoose')
const Schema       = mongoose.Schema

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  photos: [{ type: String, required: true }],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

productSchema.virtual('averageRate').get(function() {
  if (this.reviews.length > 0) {
    let totalRate = this.reviews.reduce((total, review) => {
      return total + review.rating
    }, 0)
    return totalRate / this.reviews.length
  }
  return 0
});

productSchema.virtual('topImage').get(function() {
  if (this.photos.length > 0) {
    return this.photos[0]
  }
  return ""
})

module.exports = mongoose.model('Product', productSchema)