import axios from 'axios'
import { API_URL } from '../../config'
// import router from '../../router/router'
import { deleteAllCookies } from '../../Utils/cookies'

function setCookie (cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

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
      localStorage.removeItem('userPermissions')
      localStorage.removeItem('domain')
      deleteAllCookies()
      document.location.href = '/'
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
            console.log(response.data)
            /**
             * * converting roles to objects instead of array
             */
            const permissions = {}
            const arrayOfRoles = response.data.role.permission
            arrayOfRoles.forEach(item => {
              permissions[item.model_name] = { ...item }
            })
            localStorage.setItem('token', response.data.token)
            setCookie('token', response.data.token, 1000)
            localStorage.setItem('userData', JSON.stringify(response.data.user))
            localStorage.setItem('userLang', 'ar')
            state.userData = response.data.user
            localStorage.setItem('userPermissions', JSON.stringify(permissions))
            state.userToken = response.data.token
            // state.userDataPermission = response.data.userPolicy
            // dispatch('checkUserData')
            // ! WE DON'T KNOW THE DOMAIN YET. I NEED IT IN THE RESPONSE.
            window.localStorage.setItem('domain', response.data.facility.url)
            window.location.href = process.env.BASE_URL + response.data.facility.url
          } else {
            console.log('response', response)
            if (response.data.error_message) {
              state.loginErrorMessage = response.data.error_message
            } else if (response.errors.email) {
              state.loginErrorMessage = response.data.errors.email[0]
            }
            state.isLoading = true
          }
        })
        .catch(error => {
          console.log('error', { error })
          state.loginErrorMessage = error.response.data.error_message || error.response.data.errors.email[0]
          state.isLoading = true
        })
    },
  },
}

export default Login
