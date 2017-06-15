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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src"),
                loader: 'tslint-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    devServer: {
        port: 3000,
        publicPath: './dist',
        inline: true,
        hot: true,
    },
    devtool: 'source-map'
};
