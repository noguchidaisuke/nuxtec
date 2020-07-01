export const state = () => ({
  cart: [],
  cartLength: 0,
  csrfToken: ""
})

export const actions = {
  addToCart({state, commit}, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id)
    if (!cartProduct) {
      commit('pushToCart', product)
    } else {
      commit('incrementQuantity',cartProduct)
    }
    commit('incrementCartLength')
  },

  buyNow({state, commit}, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id)
    if(!cartProduct) {
      commit('pushToCart', product)
    }
    commit('incrementCartLength')
  },

  async nuxtServerInit({dispatch, commit}, { req }) {
    console.log("NUXT SERVER INIT//////////////////");

    // CSRF TOKEN
    if (req.cookies) {
      commit('SET_CSRF_TOKEN', req.csrfToken())
    }
    // SET AUTH USER
    await dispatch('auth/fetchUser').catch(_ => console.log("Not Authorized!"))
  }
}

export const mutations = {
  pushToCart(state, product) {
    product.quantity = 1;
    state.cart.push(product)
    console.log(state.cart)
  },
  incrementQuantity(state, cartProduct) {
    const index = state.cart.indexOf(cartProduct)
    cartProduct.quantity ++
    state.cart.splice(index, 1, cartProduct)
  },
  incrementCartLength(state) {
    state.cartLength = 0;
    if(state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity
      })
    }
  },
  changeQuantity(state, {product, quantity}) {
    let cartProduct = state.cart.find(prod => prod._id === product._id)
    let index = state.cart.indexOf(cartProduct)
    cartProduct.quantity = quantity
    state.cart.splice(index, 1, cartProduct)

    state.cartLength = 0;
    if(state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity
      })
    }
  },

  removeProductFromCart(state, product) {
    state.cartLength -= product.quantity
    let index = state.cart.indexOf(product)
    state.cart.splice(index, 1)
  },

  clearCart(state) {
    state.cart = [];
    state.cartLength = 0
  },

  SET_CSRF_TOKEN(state, csrfToken) {
    console.log("csrfToken ====",csrfToken);
    state.csrfToken = csrfToken
  }
}

export const getters = {
  getCartTotalPrice(state) {
    let total = 0;
    state.cart.map(product => total += product.quantity * product.price);
    return total;
  },
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  }
}