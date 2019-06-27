const webpack = require('webpack');
const merge = require('webpack-merge');

// webpack公共配置
const webpackCommonConfig = require('./webpack.config.common.js');
// webpack dev 配置
const webpackDevConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'progress.env': 'production'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

// output
module.exports = merge(webpackDevConfig,webpackCommonConfig);