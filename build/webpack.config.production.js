const webpack = require('webpack');
const merge = require('webpack-merge');

function createProductionWebpackConfig(projectName) {
  if (!projectName) {
    throw (`未传入projectName`)
  }
  // webpack公共配置
  const webpackCommonConfig = require('./webpack.config.common.js')(projectName);
  // webpack dev 配置
  const webpackProductionConfig = {
    plugins: [
      new webpack.DefinePlugin({
        'progress.env': 'production'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
  return merge(webpackProductionConfig, webpackCommonConfig);
}

// output
module.exports = createProductionWebpackConfig;