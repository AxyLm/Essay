'use strict';
const webpack = require('webpack')
const path = require('path')
const babelLoader = require('babel-loader')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: {
        app: resolve('./fView.js'),
    },
    //   target: 'node',
    //   mode:'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                            ]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: resolve('./build'),
        filename: 'fView.min.js'
    },
    plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ],
    optimization: {
        minimize: true // 压缩代码
    }
};