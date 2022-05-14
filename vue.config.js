const webpack = require('webpack')
const IgnorePlugin = webpack.IgnorePlugin

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  publicPath: process.env.BASE_URL,

  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [
      // eslint-disable-next-line no-undef
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
  pluginOptions: {
    i18n: {
      locale: 'ar',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
