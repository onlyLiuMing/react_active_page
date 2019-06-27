const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Colors = require('colors');
const ora = require('ora');
const util = require('./util');
const spinner = ora(Colors.green('Loading development build... \n'));

// // 删除上一次生成的目录文件
util.reomveLastBuildFile(PROJECT_DIST_PATH);

// webpack-config
const WEBPACK_CONFIG = require('./webpack.config.production');
// webpack 实例
const Compiler = webpack(webpackMerge({ mode: 'production' }, WEBPACK_CONFIG));

// 开始 loading
spinner.start();

// start compiler 
Compiler.run((err, stat) => {
  const hasError = stat.hasErrors();
  const hasWarning = stat.hasWarnings();
  Boolean(err)&&console.log(Colors.red(String(err) + '\n'))
  hasError&&console.log(Colors.red(String(stat) + '\n'));
  hasWarning&&console.log(Colors.yellow(String(stat) + '\n'));
  // 结束 loading
  spinner.text = '';
  spinner.stop();
});