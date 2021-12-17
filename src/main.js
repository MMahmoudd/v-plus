import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from '../src/router/router'
import store from './store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import mixins from './mixins/mixins'
import DatetimePicker from 'vuetify-datetime-picker'
import axios from 'axios'
import { API_URL } from './config/index.js'
// Language Plugin
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'
import * as VueGoogleMaps from 'vue2-google-maps'
// Import Style
import './assets/main.css'
import './plugins/vuetify-money.js'
import UUID from 'vue-uuid'

Vue.use(UUID)
Vue.use(DatetimePicker)
Vue.use(VueI18n)
Vue.use(VueGoogleMaps, {
  load: {
    // mine
    key: 'AIzaSyCVqitAS9u-YPDAsQzPS6xomUn5Qe6-ukg',
    // new
    // key: 'AIzaSyAruo-VqZ_6zEgOY-4lphX-tQYQCZKOpJw',
    libraries: 'places',
    language: 'ar',
    region: 'SA',
  },
})
// Ready translated locale messages
const language = {
  en: en,
  ar: ar,
}
let userLang = 'ar'
if (localStorage.getItem('userLang')) {
  userLang = localStorage.getItem('userLang')
}

// config file with base endpoint url
axios.defaults.baseURL = `${API_URL}`

// Check User Is Authorized
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
  console.log('error', error)
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        return router.push('/login')
    }
    return Promise.reject(error.response)
})
const userToken = localStorage.getItem('token')
if (userToken) {
  console.log('error', axios.interceptors.response)
  // axios.defaults.headers.common['x-access-token'] = 'Bearer ' + userData.token
  axios.defaults.headers.common.Authorization = 'Bearer ' + userToken
  axios.defaults.headers['Content-type'] = 'application/json'
  axios.defaults.headers.accept = '*/*'
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: userLang,
  messages: language,
})
Vue.use(require('vue-moment'))
Vue.use(VueResource)
// Vue Mixins
Vue.mixin({
  mixins: [mixins],
})
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
