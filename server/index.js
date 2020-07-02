const consola           = require('consola')
const app               = require('express')()
require('dotenv').config()
const cacheMiddleware = require('./middleware/cache-middleware')

const { Nuxt, Builder } = require('nuxt')
const config            = require('../nuxt.config.js')

const port = process.env.PORT || 9004
const host = process.env.HOST || 'localhost'
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

  const nuxt = new Nuxt(config)
  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(cacheMiddleware)
  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listening ${port} `,
    badge: true
  })
}
start()
