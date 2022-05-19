const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|jpeg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]_[hash][ext]',
        },
      },
      {
        test: /\.(config)$/,
        use: {
          loader: 'file-loader?name=[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/settings.json'), to: '' },
        { from: path.resolve(__dirname, 'public/manifest.json'), to: '' },
        { from: path.resolve(__dirname, 'public/favicon.png'), to: '' },
        { from: path.resolve(__dirname, 'public/favicon.ico'), to: '' },
        { from: path.resolve(__dirname, 'public/icon-192x192.png'), to: '' },
        { from: path.resolve(__dirname, 'public/icon-256x256.png'), to: '' },
        { from: path.resolve(__dirname, 'public/icon-384x384.png'), to: '' },
        { from: path.resolve(__dirname, 'public/icon-512x512.png'), to: '' },
        { from: path.resolve(__dirname, 'public/apple-touch-icon.png'), to: '' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
