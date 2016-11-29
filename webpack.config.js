const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src/App.tsx',
        'webpack-dev-server/client?http://localhost:3000'
    ],
    cache: true,
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'tslint'
                ]
            },
            {
                test: /\.js$/,
                loaders: [
                    'source-map'
                ]
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'ts'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ]
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                loaders: [
                    'file?name=[path][name].[ext]'
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        publicPath: './dist'
    },
    devtool: [
        'source-map'
    ]
};
