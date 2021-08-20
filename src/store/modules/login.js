import axios from 'axios'
import { API_URL } from '../../config'
import router from '../../router/router'
const Login = {
  state: {
    isLoading: false,
    loginErrorMessage: null,
    loginSuccessful: false,
    token: localStorage.getItem('token'),
    userDataPermission: [],
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
        mobile: loginData.email.replace(/\s+/g, ''),
        password: loginData.password,
      }
      axios.post(`${API_URL}/auth/login-local`, userData)
        .then((response) => {
          state.isLoading = true
          if (response.data.statusCode === 201) {
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('user', response.data.data.userData)
            dispatch('checkUserData')
            window.location.href = process.env.BASE_URL
          } else {
            state.loginErrorMessage = response.data.error[0]
            state.isLoading = true
          }
        })
        .catch(error => {
          console.log(error)
          state.loginErrorMessage = error.response.data.error[0]
          state.isLoading = true
        })
    },
  },
}

export default Login
