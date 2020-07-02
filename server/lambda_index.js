const app             = require('express')()
const cacheMiddleware = require('./middleware/cache-middleware')
require('dotenv').config()


const { Nuxt } = require('nuxt')
const config   = require('../nuxt.config.js')
const nuxt = new Nuxt(config)

app.use(cacheMiddleware, async (req, res, next) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})

module.exports = app;
