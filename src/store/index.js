import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: {
      token: '',
      received: 0
    },
    user: {
      account: '',
      name: '',
      phone: '',
      address: '',
      role: 0
    },
    category: 'all'
  },
  mutations: {
    login (state, data) {
      state.jwt.token = data.token
      state.jwt.received = new Date().getTime()
      state.user.account = data.account
      state.user.name = data.name
      state.user.phone = data.phone
      state.user.address = data.address
      state.user.role = data.role
    },
    logout (state) {
      state.jwt = {
        token: '',
        received: 0
      }
      state.user = {
        account: '',
        name: '',
        phone: '',
        address: '',
        role: 0
      }
    },
    extend (state, data) {
      state.jwt.token = data
      state.jwt.received = new Date().getTime()
    },
    getinfo (state, data) {
      state.user.account = data.account
      state.user.name = data.name
      state.user.phone = data.phone
      state.user.address = data.address
      state.user.role = data.role
    },
    showCategory (state, data) {
      state.category = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user (state) {
      return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }
    }
  },
  plugins: [createPersistedState()]
})
