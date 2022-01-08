const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

console.log('______process.env.NODE_ENV______:', process.env.NODE_ENV)

module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV == 'production' ? 'cheap-module-source-map' : 'eval-cheap-module-source-map', //打包后的文件和源文件的映射关系
    entry: {
        main: "./src/index.js",
    },
    output: {
        // publicPath: 'https://cdn.xxx.com/',  // 可以用于CDN路径
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[contenthash:8].js",
        chunkFilename: "chunk/[name]-[chunkhash:8]-chunk.js"
    },
    module: {
        rules: [{
                test: /\.(jpg|png|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        limit: 2 * 1024, //单位B 如果图片大于limit相当于file-loader打包为文件,否则就转为base64打包进bundle.js
                        // publicPath: 'https://cdn.xxx.com/img/', 
                    },
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font/'
                    }
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage' //使用到的新语法才会加入到打包中 可以减少体积
                                }
                            ]
                        ],
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    process.env.NODE_ENV == 'production' ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', //不同环境下的打包，如果出现图片、字体显示不了时，请检查publicPath的配置。
                        }
                    } : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    process.env.NODE_ENV == 'production' ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', //不同环境下的打包，如果出现图片、字体显示不了时，请检查publicPath的配置。
                        }
                    } : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // css模块化
                        }
                    },
                    'postcss-loader', // 可以在这里配置 也可以在postcss.config中配置
                    'sass-loader'
                ]
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
            chunkFilename: 'css/[name]-[chunkhash:8]-chunk.css'
        }),
        new webpack.DefinePlugin({
            'test': JSON.stringify('test')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // chunks: ['main'],
            catch: false
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: process.env.NODE_ENV == 'production' ? {
        minimizer: [ //mode: 'production'会开启tree-shaking和js代码压缩，但配置optimization.minimizer会使默认的压缩功能失效。所以，指定css压缩插件的同时，务必指定js的压缩插件。
            //压缩js
            new TerserWebpackPlugin(),
            //压缩css
            new OptimizeCssAssetsWebpackPlugin()
        ],
        //代码分割
        splitChunks: {
            cacheGroups: {
                //公共模块css
                commonCss: { //mini-css-extract-plugin插件，结合optimization.splitChunks.cacheGroups配置，可以把css代码打包到单独的css文件，且可以设置存放路径（通过设置插件的filename和chunkFilename
                    name: 'common',
                    test: /\.(css)$/,
                    chunks: 'all',
                    enforce: true,
                },
                //第三方模块
                vendor: {
                    name: 'vendor', //每个组的名字
                    priority: 1, //优先级，优先级越高，越先检测处理   第三方模块可能也会被作为公共模块js来检测处理，通过高优先级，达到先被当做第三方模块来检测处理
                    test: /node_modules/, //检测方法 例如：检测模块是否来自node_modules
                    chunks: 'all', //all对同步、异步代码都做代码分割   async对异步代码做代码分割   initial对同步代码做代码分割   同步代码:例如import loadsh from 'loadsh'   异步代码:例如import('loadsh')
                    minSize: 5 * 1024, //检测模块大小 单位B
                    minChunks: 1, //检测模块被引用了几次
                },
                //公共模块js
                commonJs: {
                    name: 'common', //每个组的名字
                    priority: 1, //优先级，优先级越高，越先检测处理
                    chunks: 'all', //all对同步、异步代码都做代码分割   async对异步代码做代码分割   initial对同步代码做代码分割   同步代码:例如import loadsh from 'loadsh'   异步代码:例如import('loadsh')
                    minSize: 0, //检测模块大小 单位B
                    minChunks: 2, //检测模块被引用了几次    教程中是多入口引用2次才可以分割 这边2不行1才可以
                }
            }
        },
    } : undefined,
    devServer: {
        // host: 'localhost',   //host
        port: 8080, //服务器启动的端口
        contentBase: './dist', //服务器静态资源文件夹
        progress: true, //打包时显示进度条
        open: true, //启动服务器后，自动打开浏览器
        compress: true, //开启gzip压缩
        hot: true, //模块热更新HMR
        proxy: {
            // '/todos': {
            //     target: 'https://jsonplaceholder.typicode.com/',
            //     changeOrigin: true,  //这个参数加上就对了
            // }
            '/api/todos': {
                target: 'https://jsonplaceholder.typicode.com/',
                changeOrigin: true, //这个参数加上就对了
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',  //解决项目根目录存在.browserslistrc文件，或者package.json存在“browserslist”时，样式和js无法热更新问题
};