const webpack = require('webpack');

module.exports = {
    entry: [
        './src/App.tsx'
    ],
    cache: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    output: {
        path: __dirname,
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
        port: 8080,
        cache: true,
        inline: true,
        hot: true,
        contentBase: '.',
        publicPath: '/dist/'
    }
};
