const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CommonsChunkPlugin =/ require('commons-chunk-plugin');
const config = require('../config')

module.exports = {
        context: path.resolve(__dirname, "../src"),
        entry: {
            vendor:[
                path.resolve(__dirname, '../src/js', 'common.js')
            ],
            index: path.resolve(__dirname, '../src/js', 'index.js'),
            about: path.resolve(__dirname, '../src/js', 'about.js'),
            me: path.resolve(__dirname, '../src/js', 'me.js'),
        },
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, '../dist/')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                    ]
                },
            ]
        },
        plugins: [
            ...routes(),
            // new CommonsChunkPlugin({
            //     name:'vendor',
            // }),
            new CopyWebpackPlugin([
                { 
                    from: './style/' , 
                    to:  path.resolve(__dirname,'../dist/src/style/'),
                    ignore: ['.*']
                }
            ]),
        ],
    }


function resolves(path) {
    return path.resolve(__dirname, '..', path)
}

function routes() {
    let pages = config.pages
    let plugins = []
    pages.forEach(item => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../', item.path),
                title: item.title,
                filename: item.path,
                chunks: [item.chunk],
                minify: {
                    collapseWhitespace: true, //清除空格
                    removeAttributeQuotes: true, //清除多余引号
                    removeComments: true //删除注释
                },
            })
        )
    });
    return plugins
}