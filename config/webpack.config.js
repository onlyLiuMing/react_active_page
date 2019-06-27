/**
 * @description webpack config 配置文件
 */

const path = require('path');

// 基础配置
const baseConfig = {
  host: 'localhost',// dev-server-host; can be overwriteen by process.env.HOST
  port: 3000,// dev-server-port; can be overwriteen by process.env.PORT
  outputPath: path.resolve(__dirname,'..','dist'),// output path // FIXME: 目前没用
}

const config = {
  development:{ ...baseConfig, },
  product:{ ...baseConfig, }
};

// output
module.exports = config