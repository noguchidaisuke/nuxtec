export default ({$axios, store}) => {
  $axios.defaults.headers.common = {}
  $axios.onRequest(config => {
    config.headers.common['X-CSRF-TOKEN'] = store.state.csrfToken
  })
}

