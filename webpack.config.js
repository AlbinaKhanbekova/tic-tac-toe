var path = require('path');
const webpack = require('webpack');
const publicPath = './docs';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPreFixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

let extractStyles = new ExtractTextPlugin({
    filename: 'index.css',
    allChunks: false
});

module.exports = {
    devtool: 'eval-source-map',

    output: {
        path: path.join(__dirname, publicPath),
        filename: 'index.js',
        publicPath: '',
        sourceMapFilename: '[name].map',
    },

    devServer: {
        port: 3000,
        host: 'localhost',
        noInfo: false,
        stats: 'minimal',
        contentBase: path.join(__dirname, publicPath),
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: extractStyles.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoPreFixer({
                                    browsers: ['last 2 versions']
                                })]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['react-hot-loader/babel'],
                            cacheDirectory: true
                        }
                    }
                ]
            }]
    },

    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            classNames: 'classnames'
        }),
        extractStyles
    ],

    resolve: {
        modules: ['./src', 'node_modules'],

        alias: {
            Styles: path.resolve(__dirname, './src/scss')
        }
    }
};
