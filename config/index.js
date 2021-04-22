'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {'/wx/*': {    // 设置请求前增加的值，这个值会代替我们的网址进行请求
        // secure: false,  // 如果是https接口，需要配置这个参数
        // target: 'http://172.16.16.66:4000',    // 有多个后端的时候，注释可以方便切换
        target: 'http://chutian.ovuems.com',    // 这个就是我们设置的代理服务器地址
        changeOrigin: true,                    // 这个值就是用来跨域的，默认为false
        pathRewrite: {'^/wx': 'wx'}        // 实现替换的，将apis替换成apis,也可以设置为空
      },
      '/activity/*': {    // 设置请求前增加的值，这个值会代替我们的网址进行请求
        // secure: false,  // 如果是https接口，需要配置这个参数
        // target: 'http://172.16.16.66:4000',    // 有多个后端的时候，注释可以方便切换
        target: 'http://chutian.ovuems.com',    // 这个就是我们设置的代理服务器地址
        changeOrigin: true,                    // 这个值就是用来跨域的，默认为false
        pathRewrite: {'^/activity': 'activity'}        // 实现替换的，将apis替换成apis,也可以设置为空
      },
      '/auth/*': {    // 设置请求前增加的值，这个值会代替我们的网址进行请求
        // secure: false,  // 如果是https接口，需要配置这个参数
        // target: 'http://172.16.16.66:4000',    // 有多个后端的时候，注释可以方便切换
        target: 'http://chutian.ovuems.com',    // 这个就是我们设置的代理服务器地址
        changeOrigin: true,                    // 这个值就是用来跨域的，默认为false
        pathRewrite: {'^/auth': 'auth'}        // 实现替换的，将apis替换成apis,也可以设置为空
      },
      '/appointment/*': {    // 设置请求前增加的值，这个值会代替我们的网址进行请求
        // secure: false,  // 如果是https接口，需要配置这个参数
        // target: 'http://172.16.16.66:4000',    // 有多个后端的时候，注释可以方便切换
        target: 'http://chutian.ovuems.com',    // 这个就是我们设置的代理服务器地址
        changeOrigin: true,                    // 这个值就是用来跨域的，默认为false
        pathRewrite: {'^/appointment': 'appointment'}        // 实现替换的，将apis替换成apis,也可以设置为空
      },
      '/free/*': {
        // target: 'http://172.16.16.66:4000',
        target: 'http://chutian.ovuems.com',
        changeOrigin: true,
        pathRewrite: {'^/free': 'free'}
      },
      '/info/*': {
        // target: 'http://172.16.16.66:4000',
        target: 'http://chutian.ovuems.com',
        changeOrigin: true,
        pathRewrite: {'^/info': 'info'}
      },
      '/customer/*': {
          // target: 'http://172.16.16.66:4000',
        target: 'http://chutian.ovuems.com',
        changeOrigin: true,
        pathRewrite: {'^/customer': 'customer'}
      },
      '/advert/*': {
        // target: 'http://172.16.16.66:4000',
        target: 'http://chutian.ovuems.com',
        changeOrigin: true,
        pathRewrite: {'^/advert': 'advert'}
      },

    },

    // Various Dev Server settings
    host: '172.16.16.70', // can be overwritten by process.env.HOST
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
