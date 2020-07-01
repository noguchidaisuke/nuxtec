const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  products: [{
    productID: {type: Schema.Types.ObjectId, ref: "Product"},
    quantity: Number
  }],
  arrivalDate: String,
  orderDate: String,
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  totalPrice: Number
})

module.exports = mongoose.model('Order', orderSchema)