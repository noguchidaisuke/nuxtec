
module.exports =  {
  mode: 'universal',
  srcDir: 'client',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '@/assets/css/iconfont/material-icons.css',
    '@/assets/css/all_font.css'
  ],
  // router: {
  //   base: '/prod/'
  // },
  plugins: [
    { src: "~/plugins/localStorage.js", mode: 'client'},
    { src: "~/plugins/day.js"},
    { src: "~/plugins/axios.js"}
  ],

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],
  axios: {
    // baseURL: process.env.BASE_URL || 'http://localhost:9004/',
    baseURL: 'https://d21iuqrezm3div.cloudfront.net/',
    // baseURL: 'https://w9yd2ly2yj.execute-api.ap-northeast-1.amazonaws.com/prod/',
    credentials : true
  },
  toast: {
    position: 'top-right',
    duration: 3000
  },
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    defaultAssets: {
      icons: false,
      font: false
    },
    icons: {
      iconfont: "md"
    }
  },
  render: {
     gzip: false
  },
  serverMiddleware: [
    '../api/server.js'
  ],
  build: {
    // publicPath: 'https://d21iuqrezm3div.cloudfront.net/nuxt/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}