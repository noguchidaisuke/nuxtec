const app      = require('express')()
require('dotenv').config()
// const app      = require('../api/server.js')

const { Nuxt } = require('nuxt')
const config   = require('../nuxt.config.js')
const nuxt = new Nuxt(config)

app.use(async (req, res, next) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})

module.exports = app;
