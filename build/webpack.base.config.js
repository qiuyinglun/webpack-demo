// 基础公共配置文件
// const path = require("path");
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {
//     CleanWebpackPlugin
// } = require('clean-webpack-plugin');

// module.exports = {
//     entry: {
//         main: "./src/index.js",
//     },
//     output: {
//         // publicPath: 'https://cdn.xxx.com/',  // 可以用于CDN路径
//         path: path.resolve(__dirname, "dist"),
//         filename: "[name]-[contenthash:8].js"
//     },
//     module: {
//         rules: [{
//                 test: /\.(jpg|png|jpeg|gif)$/,
//                 use: {
//                     loader: 'url-loader',
//                     options: {
//                         name: '[name].[ext]',
//                         outputPath: 'img/',
//                         limit: 2048, //单位B 如果图片大于limit相当于file-loader打包为文件,否则就转为base64打包进bundle.js
//                         // publicPath: 'https://cdn.xxx.com/img/', 
//                     },
//                 }
//             },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2)$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         name: '[name].[ext]',
//                         outputPath: 'font/'
//                     }
//                 }
//             },
//             {
//                 test: /\.(js)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: [
//                             [
//                                 '@babel/preset-env',
//                                 {
//                                     useBuiltIns: 'usage'    //使用到的新语法才会加入到打包中 可以减少体积
//                                 }
//                             ]
//                         ],
//                     }
//                 }
//             },
//             {
//                 test: /\.(css)$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.(scss)$/,
//                 use: [
//                     'style-loader',
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             modules: true // css模块化
//                         }
//                     },
//                     'postcss-loader', // 可以在这里配置 也可以在postcss.config中配置
//                     'sass-loader'
//                 ]
//             },
//         ]
//     },
//     plugins: [
//         new webpack.DefinePlugin({
//             'test': JSON.stringify('test')
//         }),
//         new HtmlWebpackPlugin({
//             template: './src/index.html',
//             catch: false
//         }),
//         new CleanWebpackPlugin()
//     ]
// };

const baseConfig = require('../webpack.config.js');

module.exports = baseConfig;