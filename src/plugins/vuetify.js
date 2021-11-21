import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#3772FF',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  danger: '#DF2935',
}
export default new Vuetify({
  // icons: {
  //   iconfont: 'fa4',
  // },
  rtl: true,
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
