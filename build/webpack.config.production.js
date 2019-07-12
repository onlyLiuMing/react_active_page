const webpack = require('webpack');
const merge = require('webpack-merge');
const { productionEnvConfig } = require('../config/webpack.env');

function createProductionWebpackConfig(projectName) {
  if (!projectName) {
    throw `未传入projectName`;
  }
  // webpack公共配置
  const webpackCommonConfig = require('./webpack.config.common.js')(
    projectName
  );
  // webpack dev 配置
  const webpackProductionConfig = {
    plugins: [new webpack.DefinePlugin({})],
  };
  return merge(
    { mode: 'production' },
    webpackProductionConfig,
    webpackCommonConfig
  );
}

// output
module.exports = createProductionWebpackConfig;
