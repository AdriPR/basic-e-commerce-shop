const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'auto',
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        hot: true,
        static: path.resolve(__dirname, 'build'),
        historyApiFallback: {
            index: 'index.html'
        },
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: './public', globOptions: {ignore: ['**/index.html']}}
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true,
            hash: true,
        })
    ]
}