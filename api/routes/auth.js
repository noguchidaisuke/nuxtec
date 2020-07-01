const express     = require('express');
const router      = express.Router();
const User        = require('../models/user')
const jwt         = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
const bcrypt      = require('bcryptjs')
const dev_cookie_option = { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: 'Strict' }
// const pro_cookie_option = { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, sameSite: 'None', secure: true }
const pro_cookie_option = { ...dev_cookie_option, secure: true }

// find one user
router.get('/auth/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.decoded._id})
    res.json(user)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// register
router.post('/auth/register', async (req, res)=>{
  if(!req.body.email)    return res.status(401).json({success: false, message: "please enter email"})
  if(!req.body.password) return res.status(401).json({success: false, message: "please enter password"})

  try {
    let newUser      = new User();
    newUser.name     = req.body.name;
    newUser.email    = req.body.email;
    newUser.password = req.body.password;
    await newUser.save();
    const token = jwt.sign(newUser.toJSON(), process.env.SECRET, {expiresIn: 604800})

    res.json({
      success: true,
      token: token,
      message: "Successfully created a new user"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

// login
router.post('/auth/login', async (req, res)=>{
  try {
    let findUser = await User.findOne({email: req.body.email})
    if (!findUser) {
      return res.status(403).json({success: false, message: 'wrong email'})
    }

    if (bcrypt.compareSync(req.body.password, findUser.password)) {
      let token = jwt.sign(findUser.toJSON(), process.env.SECRET, { expiresIn: 604800 })
      console.log("host===",req.headers.host);
      const cookie_option =
        req.headers.host === 'localhost:9004' ? dev_cookie_option : pro_cookie_option
      res.cookie('cookie_auth_token', token, cookie_option);
      res.json(findUser)
    } else {
      res.status(403).json({success: false, message: 'wrong password'})
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

//put
router.put('/auth/user', verifyToken, async(req, res) => {
  try {
    let user = await User.findOne({_id: req.decoded._id})
    if (user.name) user.name   = req.body.name
    if (user.email) user.email = req.body.email

    await user.save();

    res.json({
      success: true,
      user
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// logout
router.get('/auth/logout', (req, res) => {
  res.cookie('cookie_auth_token', "")
  res.json({
    success: true,
    message: "ログアウトしました"
  })
})

module.exports = router;