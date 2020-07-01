export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  removeUser(state) {
    state.user = null;
  }
}

export const actions = {
  login({commit, state}, formData) {
    return this.$axios.$post('/api/auth/login', formData)
      .then(user => {
        commit('setUser', user)
        return state.user
      }).catch(err => {
        return Promise.reject(err)
      });
  },

  logout({commit}) {
    this.$axios.$get('/api/auth/logout')
      .then(_ => {
        commit('removeUser')
      })
  },

  fetchUser({commit, state}) {
    return this.$axios.$get('/api/auth/user')
      .then(user => {
        commit('setUser', user)
        return state.user
      }).catch(err => {
        return Promise.reject(err)
      });
  }
}

export const getters = {
  getCurrentUser(state) {
    return state.user
  },
  loggedIn(state) {
    return !!state.user
  }
}
