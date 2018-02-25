const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/js/index.js', './src/scss/styles.scss'],
    output: {
        filename: 'js/index.js',
        path: path.join(__dirname, './dist/')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.html$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.(png|jpe?g)/i,
            include: path.resolve(__dirname, 'src'),
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
            include: path.resolve(__dirname, 'src'),
            use: ExtractTextPlugin.extract({
                use: [
                {
                    loader: 'css-loader',
                    options: { minimize: true }
                },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader' }
                ]
            })
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
        }]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'css/styles.css'
        })
    ]
};