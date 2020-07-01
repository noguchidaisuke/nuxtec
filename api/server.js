const express           = require('express')
const app               = express()
const mongoose          = require('mongoose')
const morgan            = require('morgan')
const cors              = require('cors')
const cookieParser      = require('cookie-parser')
const csrf              = require('csurf')
require('dotenv').config()

mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },err => {
  if (err) {
    console.log(err)
  } else {
    console.log("connected mongoDB Atlas")
  }
})


// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({credentials: true, origin: 'https://d21iuqrezm3div.cloudfront.net/'}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(csrf({ cookie: true }));


app.get('/home', (req, res) => {
  res.json("success")
})

app.get('/cookie', (req,res) => {
  let option = { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: 'Strict' }
  res.cookie('cookie_test', "ok", option);
  res.json("success")
})

// router
const userRoute     = require('./routes/auth')
const productRoute  = require('./routes/product')
const categoryRoute = require('./routes/category')
const reviewRoute   = require('./routes/review')
const addressRoute  = require('./routes/address')
const paymentRoute  = require('./routes/payment')
const orderRoute    = require('./routes/order')

app.use('/api', userRoute)
app.use('/api', productRoute)
app.use('/api', categoryRoute)
app.use('/api', reviewRoute)
app.use('/api', addressRoute)
app.use('/api', paymentRoute)
app.use('/api', orderRoute)

// module.exports = app
module.exports = {
  handler: app
};
