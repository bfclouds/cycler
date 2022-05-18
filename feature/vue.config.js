const path = require('path')

function resolveDir(dir){
  return path.join(__dirname,dir)
}


module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolveDir('./src/assets'))
    },
  outputDir: path.join(__dirname, '../public/feature'),
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  devServer: {
    open: false,
    host: '0.0.0.0',
    https: false,
    proxy: {
      '/api': {
        target: 'https://gitee.com/monkeyWang/rubick-database/raw/master',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}
