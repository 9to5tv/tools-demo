const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const config = require('./env.config.js').development;

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './src/js/index.js',
    './src/styles/main.scss'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'PUSHER_KEY': JSON.stringify(config.PUSHER_KEY),
        'SERVER_URL': JSON.stringify(config.SERVER_URL)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ExtractTextPlugin('styles.css'),
    // new StyleExtHtmlWebpackPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ output: { ascii_only: true } })
  ],
  devServer: {
    contentBase: './dist',
    watchOptions: {
      aggregateTimeout: 100,
      poll: 300
    },
    historyApiFallback: {
      index: 'index.html'
    },
    hot: true,
    host: '0.0.0.0',
    port: 8080
  }
};