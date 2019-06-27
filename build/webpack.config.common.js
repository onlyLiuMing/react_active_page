const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const util = require('./util');
const config = require('../config/webpack.config');

// 项目目录名称
const PROJECT_NAME = 'template';
// 项目原始目录
const PROJECT_SOURCE_PATH = path.join(__dirname,'..',`src/projects/${PROJECT_NAME}`);
// 项目生成目标目录
const PROJECT_DIST_PATH = path.join(__dirname,'..',`dist/${PROJECT_NAME}`);

// // 删除上一次生成的目录文件
// util.reomveLastBuildFile(PROJECT_DIST_PATH);

module.exports = merge({
  entry: {
    [PROJECT_NAME]: PROJECT_SOURCE_PATH
  },
  output: {
    path: PROJECT_DIST_PATH,
    filename: `index.[hash].bundle.js`,
    publicPath: 'src/assets/',
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],// 使用的扩展名
    alias: {
      '@src': path.join(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
})