import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: '#408eff',
    // barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    stateMediaModal: false,
    my_transactions_total: {
      added: 0,
      suspended: 0,
      underEvaluation: 0,
      underReview: 0,
      underApproval: 0,
      approvaed: 0,
    },
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_TOTAL_TRANSACTIONS (state, payload) {
      const { type, total } = payload
      state.my_transactions_total[type] = total
    },
  },
  actions: {
    setTotal (context, payload) {
      context.commit('SET_TOTAL_TRANSACTIONS', payload)
    },
  },
  modules: {
    login,
  },
})
