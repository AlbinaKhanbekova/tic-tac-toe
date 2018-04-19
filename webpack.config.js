var path = require('path');
const webpack = require('webpack');
const publicPath = './public';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPreFixer = require('autoprefixer');

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    devtool: 'eval-source-map',
    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            classNames: 'classnames'
        })
    ],

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
                use: [
                    'style-loader',
                    'css-loader',
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
    resolve: {
        modules: ['./src', 'node_modules'],

        alias: {
            Styles: path.resolve(__dirname, './src/scss')
        }
    }
};
