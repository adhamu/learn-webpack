let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/js/index.js'],
        styles: ['./src/scss/styles.scss']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/,
                exclude: ['node_modules'],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[hash].png',
                            limit: 10000
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css'
        }),
        new ManifestPlugin()
    ]
};
