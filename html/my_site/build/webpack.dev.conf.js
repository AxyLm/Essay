const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        inline: true,
        port: config.port,
        index: 'index.html',
        openPage: 'index.html'
    },
    plugins:[
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [
                `Your application is running here: http://localhost:8080`
              ]
            }
          })
    ]
});