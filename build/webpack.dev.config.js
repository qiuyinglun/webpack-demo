// 开发环境配置文件
const commonConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');

const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
}

module.exports = merge(commonConfig, devConfig)