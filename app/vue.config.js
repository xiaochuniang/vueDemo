const path = require('path')

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css 相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 是否开启css source maps 插件
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
        requireModuleExtension: true
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    }
}