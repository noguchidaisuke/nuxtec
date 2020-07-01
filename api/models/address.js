const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  state: String,
  address: String,
  zipCode: Number,
  phoneNumber: Number,
  name: String
})

module.exports = mongoose.model('Address', addressSchema)