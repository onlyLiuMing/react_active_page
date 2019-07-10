const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config/webpack.config');
const { developmentEnvConfig } = require('../config/webpack.env');

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 8000;

function createDevWebpackConfig(projectName) {
  if (!projectName) {
    throw `未传入projectName`;
  }

  // 项目目录名称
  const PROJECT_NAME = projectName;
  // webpack公共配置
  const webpackCommonConfig = require('./webpack.config.common.js')(
    PROJECT_NAME
  );
  // 项目生成目标目录
  const PROJECT_DIST_PATH = path.join(__dirname, '..', `dist/${PROJECT_NAME}`);
  // webpack dev 配置
  const webpackDevConfig = {
    devServer: {
      contentBase: PROJECT_DIST_PATH,
      publicPath: `/${PROJECT_NAME}/`,
      compress: true,
      port: config.development.port || DEFAULT_PORT,
      host: config.development.host || DEFAULT_HOST,
      hot: true,
      hotOnly: true,
      historyApiFallback: true,
      clientLogLevel: 'warning',
      lazy: false,
      open: true, //启动后，打开浏览器
      openPage: `${PROJECT_NAME}/`, // 这里的path必须和publicPath对应（主要是最后面的 "斜杠" ）
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
      inline: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': developmentEnvConfig,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
  return merge(webpackDevConfig, webpackCommonConfig);
}

// output
module.exports = createDevWebpackConfig;
