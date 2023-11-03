const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'web'),
        publicPath: 'auto',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {
                    compress: false
                },
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 5000000,
        maxAssetSize: 3000000,
    },
    devServer: {
        hot: true,
        static: path.resolve(__dirname, 'web'),
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