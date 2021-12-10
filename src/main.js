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
// Language Plugin
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'
import * as VueGoogleMaps from 'vue2-google-maps'
// Import Style
import './assets/main.css'

Vue.use(DatetimePicker)
Vue.use(VueI18n)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyACgY2Kl1e1DAM80BgiwVUo8BKXzJ5tU7w',
    libraries: 'places',
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
// axios.defaults.baseURL = process.env.APP_URL

// Check User Is Authorized
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        return router.push('/login')
    }
    return Promise.reject(error.response)
})
const userToken = localStorage.getItem('token')
if (userToken) {
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
