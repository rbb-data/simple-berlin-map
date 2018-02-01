const path = require('path')
const webpack = require('webpack')

const htmlTemplate = require('html-webpack-template')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const extractStyles = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
})
const copyData = new CopyWebpackPlugin([
  { from: './data/markers.geo.json', to: './data' }
])
const hmr = new webpack.HotModuleReplacementPlugin()

//
// templates for generated html files
//

const createHTML = new HtmlWebpackPlugin({
  inject: false,
  template: htmlTemplate,
  lang: 'de',
  mobile: true,
  chunks: ['index'],
  filename: 'index.html',
  title: 'Weiterführende Schulen in Berlin'
})

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/entryPoints/Main/index.js'
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dst')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(sass)/,
        use: ['css-hot-loader'].concat(extractStyles.extract({
          use: [
            { loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [require('autoprefixer')()]
              }
            },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.css/,
        use: extractStyles.extract({
          use: [{ loader: 'css-loader' }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|gif|jpe?g|woff)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    createHTML,
    extractStyles,
    copyData,
    hmr
  ],

  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      '@components': path.resolve(__dirname, 'src/components'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@root': path.resolve(__dirname, 'src'),
      '@data': path.resolve(__dirname, 'data')
    }
  },

  // configure webpack-dev-server
  devServer: {
    hot: true,
    open: true,
    index: 'index.html'
  }
}
