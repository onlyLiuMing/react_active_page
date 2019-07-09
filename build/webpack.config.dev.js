const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config/webpack.config');



function createDevWebpackConfig(projectName) {
  if (!projectName) {
    throw (`未传入projectName`)
  }

  // 项目目录名称
  const PROJECT_NAME = projectName;
  // webpack公共配置
  const webpackCommonConfig = require('./webpack.config.common.js')(PROJECT_NAME);
  // webpack dev 配置
  const webpackDevConfig = {
    devServer: {
      // contentBase: PROJECT_DIST_PATH,
      contentBase: false,
      publicPath: `/project/${PROJECT_NAME}`,
      compress: true,
      port: config.development.port,
      host: config.development.host,
      hot: true,
      hotOnly: true,
      clientLogLevel: 'warning',
      lazy: false,
      open: true, //启动后，打开浏览器
      openPage: `project/${PROJECT_NAME}`,
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
      inline: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'progress.env': 'development'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
  return merge(webpackDevConfig, webpackCommonConfig);
}

// output
module.exports = createDevWebpackConfig; 