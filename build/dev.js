const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const Colors = require('colors');
const ora = require('ora');
const util = require('./util');
const args = require('node-args')
const portfinder = require('portfinder');

// loading 实例
const spinner = ora(Colors.green('Loading development starting ... \n'));

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
util.verifyBuildParams(args, PROJECT_NAME);

// // 删除上一次生成的目录文件
util.reomveLastBuildFile(PROJECT_DIST_PATH);

// webpack-config
const WEBPACK_CONFIG = require('./webpack.config.dev')(PROJECT_NAME);
// webpack-dev-config
const WEBPACK_SERVER_CONFIG = WEBPACK_CONFIG.devServer;
// default server config
const PORT = WEBPACK_SERVER_CONFIG.port || 3000;
const HOST = WEBPACK_SERVER_CONFIG.host;
const OPEN_URL = WEBPACK_SERVER_CONFIG.openPage;

// 检测port是否被占用(被占用则默认 +1)
portfinder.basePort = PORT;// 需要检测的起始port
portfinder.getPortPromise()
  .then((port) => {
    // 可用的端口
    const ENABLE_PORT = port;
    // // webpack 实例
    const Compiler = webpack(webpackMerge({ mode: 'development' }, WEBPACK_CONFIG));
    // webpack-server 实例
    const Server = new webpackDevServer(Compiler, WEBPACK_SERVER_CONFIG);
    // start server
    Server.listen(ENABLE_PORT, HOST, function () {
      // show toast
      spinner.text = Colors.green('Your application is running here:') + ' ' + Colors.cyan(`http://localhost:${ENABLE_PORT}/${OPEN_URL}`);
    });
  })
  .catch(err => {
    console.log(JSON.stringify(err));
    process.exit(0);
  })
