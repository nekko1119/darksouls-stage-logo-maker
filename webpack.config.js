const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/App.tsx'
    ],
    cache: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: './dist/bundle.js'
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
            }
        ]
    },
    devServer: {
        port: 8080,
        cache: true,
        inline: true,
        hot: true,
        contentBase: '.',
        publicPath: '/dist/'
    }
};
