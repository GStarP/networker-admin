const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 生产环境部署的路径
const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/networker/admin'
  : '/';

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'networker/admin',
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启生产环境的 source map
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('plugins', resolve('src/plugins'))
      .set('views', resolve('src/views'));
    config.resolve.extensions
      .add('*', '.js', '.json', '.vue');
    // vuetify
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, {data: `@import '~assets/style/main.scss';`}))
    });
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~assets/style/main.scss"`
      }
    }
  },
  devServer: {
    https: false,
    open: true, // 自动启动浏览器
    port: 8080,
    proxy: {
      '/api': {   //api 代理配置
        target: process.env.NODE_ENV === "production" ?
          'http://localhost' :          //部署环境
          'http://localhost:8080',      //本地运行环境
        changeOrigin: true,
      },
    }
  }
};
