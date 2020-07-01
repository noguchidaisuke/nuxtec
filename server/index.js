const consola           = require('consola')
const app               = require('express')()
// const app               = require('../api/server.js')
require('dotenv').config()
process.env.BASE_URL = 'http://localhost:9004/'


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

  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listening ${port} `,
    badge: true
  })
}
start()
