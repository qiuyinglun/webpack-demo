// 生产环境配置文件
const commonConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
}

module.exports = merge(commonConfig, prodConfig)