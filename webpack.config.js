const CircularDependencyPlugin = require('circular-dependency-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')

const optimize = process.argv.indexOf('-p') >= 0
const outPath = path.join(__dirname, './dist')
const sourcePath = path.join(__dirname, './src')

const ENVIRONMENT = process.env.ENVIRONMENT || 'local'

module.exports = {
  context: sourcePath,
  mode: optimize ? 'production' : 'development',
  entry: {
    main: './index.js',
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'redux'],
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  target: 'web',
  resolve: {
    extensions: ['.js'],
    mainFields: ['browser', 'main'],
    alias: {
      '~': sourcePath,
      shared: path.join(sourcePath, './components/shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !optimize,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'classnames-loader!style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !optimize,
                minimize: true,
                importLoaders: 2,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !optimize,
                includePaths: [path.resolve(sourcePath, './global_styles')],
              },
            },
          ],
        }),
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
        ],
        exclude: /\node_modules/,
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new Webpack.DefinePlugin({
      ENVIRONMENT,
      NODE_ENV: ENVIRONMENT,
      'process.env.ENVIRONMENT': ENVIRONMENT,
      'process.env.NODE_ENV': JSON.stringify(
        optimize ? 'production' : 'development'
      ),
      isDev: !optimize,
    }),
    new Webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !optimize,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false,
    },
  },
  optimization: optimize
    ? {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: { output: { comments: false } },
          }),
          new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          automaticNameDelimiter: '~',
          chunks: 'all',
        },
      }
    : undefined,
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
}
