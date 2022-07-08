// 使用less插件
const CracoLessPlugin = require('craco-less')
// 使用 alias 插件
const aliasPlugin = require('craco-alias')

module.exports = () => ({
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 修改主题色
            modifyVars: { '@primary-color': '#4578FA' },
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
