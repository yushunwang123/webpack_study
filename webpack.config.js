const { resolve } = require('path');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'development';// 设置nodejs环境，设置这句话后才会对css在开发环境下适配，否则默认是生产环境

module.exports = {
    // entry: ['./src/index.js', './src/index.html'],
    entry: './src/index.js',
    // entry: {
    //     index: './src/index.js',
    //     test: './src/test.js',
    // },
    output: {
        filename: './[name].js',
        path: resolve(__dirname, 'build'),
        chunkFilename: 'js/[name]_chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,// 用这个loader取代style-loader。作用：提取js中的css成单独文件
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'asset/images'
                }
            },
            {
                test: /\.html/,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 //两个进程
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示abel做怎么样的兼容性处理
                            presets: [
                                ['@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        // 指定core-js版本
                                        corejs: {
                                            version: 3
                                        },
                                        // 指定兼容性做到哪个版本浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            edge: '17',
                                            safari: '10',
                                        }
                                    }]
                            ],
                            // 开启babel缓存。第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // html-webpack-plugin插件，默认会创建一个空的HTML，自动引入打包输出的所有资源（JS、CSS）
        new HtmlWebpackPlugin({
            // 需要由结构的HTML文件，可以通过配置template，复制该html文件，并自动引入自动引入打包输出的所有资源（JS、CSS）
            template: './src/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/[name].css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也要变
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/mainfest.json')
        }),
        // 将某个文件打包输出，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR功能
        hot: true,
    },
    devtool: 'eval-source-map',
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
    // externals: {
    //     // 拒绝jQuery被打包进来
    //     jquery: 'jQuery'
    // }
}