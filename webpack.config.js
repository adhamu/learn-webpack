const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/js/index.js', './src/scss/styles.scss'],
    output: {
        filename: 'js/index.js',
        path: path.join(__dirname, './dist/')
    },
    devServer: {
        contentBase: "./dist"
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
        }, {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css'
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: false,
            uglifyOptions: {
                ie8: false,
                ecma: 6,
                output: {
                    comments: false,
                    beautify: false
                },
                warnings: false
            }
        })
    ]
};