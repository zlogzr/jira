// 使用less插件
const CracoLessPlugin = require('craco-less')
// 使用 alias 插件
const aliasPlugin = require('craco-alias')

module.exports = () => ({
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3001',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     },
  //   }
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 修改主题色
            javascriptEnabled: true
          }
        }
      }
    },
    // 支持别名
    {
      plugin: aliasPlugin,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.extend.json'
      }
    }
  ]
})
