const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Colors = require('colors');
const ora = require('ora');
const util = require('./util');
const args = require('node-args')
const spinner = ora(Colors.green('Loading development build... \n'));

// args上传入的project_name的key   --project=${project_name}
const ARG_PROJECT_NAME_KEY = 'project';

// 开始 loading
spinner.start();

// 传入的项目名称
const PROJECT_NAME = args[ARG_PROJECT_NAME_KEY];
// 项目原始目录
const PROJECT_SOURCE_PATH = path.join(__dirname, '..', `src/projects/${PROJECT_NAME}`);
// 项目生成目标目录
const PROJECT_DIST_PATH = path.join(__dirname, '..', `dist/${PROJECT_NAME}`)

// 校验初始化参数
util.verifyBuildParams(args,PROJECT_NAME);

// // 删除上一次生成的目录文件
util.reomveLastBuildFile(PROJECT_DIST_PATH);

// webpack-config
const WEBPACK_CONFIG = require('./webpack.config.production')(PROJECT_NAME);
// webpack 实例
const Compiler = webpack(webpackMerge({ mode: 'production' }, WEBPACK_CONFIG));

// 开始 loading
spinner.start();

// start compiler 
Compiler.run((err, stat) => {
  const hasError = stat.hasErrors();
  const hasWarning = stat.hasWarnings();
  Boolean(err) && console.log(Colors.red(String(err) + '\n'))
  hasError && console.log(Colors.red(String(stat) + '\n'));
  hasWarning && console.log(Colors.yellow(String(stat) + '\n'));
  // 结束 loading
  spinner.text = '';
  spinner.stop();
});