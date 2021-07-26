'use strict'
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)
const isProduction = process.env.NODE_ENV === 'production'
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'element-ui': 'ELEMENT',
  axios: 'axios'
}

// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://unpkg.com/element-ui@2.13.2/lib/index.js'
    ]
  }
}

module.exports = {
  // 项目部署的基础路径 默认/
  // 放在子目录时使用./或者加你的域名
  publicPath: './',
  // 将构建好的文件输出到哪里
  outputDir: 'wisdom_barracks_html3',
  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境关闭 source map
  productionSourceMap: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  configureWebpack: config => {
    config.resolve.modules = [path.resolve('node_modules'), 'node_modules']
    if (isProduction) {
      // externals里的模块不打包
      // Object.assign(config, {
      //   externals: externals
      // })
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  chainWebpack: config => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1024,
        name: 'file/[path][name].[hash:7].[ext]'
      })
      .end()

    // 对vue-cli内部的 webpack 配置进行更细粒度的修改
    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    // 设置目录别名alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // 如果你想去掉文件名中的 .module

    loaderOptions: {
      scss: {
        prependData: '@import "assets/css/_mixin.scss";@import "assets/css/_variables.scss";@import "assets/css/reset.scss";' // 全局引入
      }
    },
    requireModuleExtension: true
  },
  lintOnSave: false, // default false
  // 打包时不生成.map文件

  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: '192.168.20.95:88', // 正式服务器
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
