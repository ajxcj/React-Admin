const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");
let theme = require('./theme.js')
module.exports = {
    plugins: [{ //less相关配置
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: theme,
                    javascriptEnabled: true,
                },
            },
        },
    }, { //路径别名配置
        plugin: CracoAlias,
        options: {
            source: "options",
            baseUrl: "./",
            aliases: {
                "@": "./src",
                "@api": "./src/api"
            }
        }
    }],
    devServer: {//本地代理
        proxy: {
            '/hehe': {
                target: 'https://shopapi.smartisan.com',
                pathRewrite: {
                    '^/hehe': ''
                },
                changeOrigin: true
            }
        }
    }
}