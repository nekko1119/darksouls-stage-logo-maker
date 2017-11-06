const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [...(
    process.env.NODE_ENV !== 'production' ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ] : []
  ),
    './src/index.tsx'
  ],
  cache: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    ...(
      process.env.NODE_ENV !== 'production' ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ] : []
    ),
    ...(
      process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
      ] : []
    )
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
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
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          ...(process.env.NODE_ENV !== 'production' ? ['react-hot-loader/webpack'] : []),
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
    contentBase: '.',
    port: 3000,
    inline: true,
    hot: true,
    publicPath: '/dist/'
  },
  devtool: 'source-map'
};
