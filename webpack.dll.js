const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_[hash]'// 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个mainfest.json，从而提供和对应包的映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',// 映射库的暴露的内容名称
            path: path.resolve(__dirname, 'dll/mainfest.json'),// 输出文件路径
        })
    ],
    mode: 'production'
};