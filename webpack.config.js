const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/js/index.js', './src/scss/styles.scss'],
    output: {
        filename: 'js/index.js',
        path: path.join(__dirname, './dist/')
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.(png|jpe?g)/i,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'img/logo.png',
                    limit: 10000
                }
            }, {
                loader: 'img-loader'
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                {
                    loader: "css-loader",
                    options: { minimize: true }
                },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
                ]
            })
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new ExtractTextPlugin({
            filename: "css/main.css"
        })
    ]
};