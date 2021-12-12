import axios from 'axios'
import { API_URL } from '../../config'
import router from '../../router/router'
const Login = {
  state: {
    // isLoading: false,
    loginErrorMessage: null,
    loginSuccessful: false,
    token: localStorage.getItem('token'),
    userDataPermission: null,
    userAuth: '',
    userToken: '',
    userData: JSON.parse(localStorage.getItem('userData')),
    successMessage: '',
    successMessageReset: '',

  },
  getters: {
    token (state) {
        return state.token
    },
  },
  mutations: {
    resetState (state) {
      state.isLoading = false
      state.loginErrorMessage = null
      state.loginSuccessful = false
      state.successMessage = ''
      state.successMessageReset = ''
  },
    // Logout
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      router.push('/login')
    },
    //  Set Token
    setToken (state, data) {
      localStorage.setItem('token', data.token)
      state.token = data.token
  },
  },
  actions: {
    doLogin ({ commit, state, dispatch }, loginData) {
      commit('resetState')
      const userData = {
        email: loginData.email.replace(/\s+/g, ''),
        password: loginData.password,
      }
      axios.post(`${API_URL}/login`, userData)
        .then((response) => {
          state.isLoading = true
          if (response.data.token) {
            console.log('response', response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userData', JSON.stringify(response.data.user))
            state.userData = response.data.user
            // localStorage.setItem('userDataPermission', response.data.userPolicy)
            state.userToken = response.data.token
            // state.userDataPermission = response.data.userPolicy
            dispatch('checkUserData')
            window.location.href = process.env.BASE_URL
          } else {
            console.log('response', response)
            state.loginErrorMessage = response.data.error_message
            state.isLoading = true
          }
        })
        .catch(error => {
          console.log('error', error)
          state.loginErrorMessage = error
          state.isLoading = true
        })
    },
  },
}

export default Login
