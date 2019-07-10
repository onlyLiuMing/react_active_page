/**
 * @description 用于webpack.DefinePlugin工具，让浏览器环境下区分 dev prod 环境
 */

//  base
const baseEnvConfig = {
  NODE_ENV: '',
};

// env == development
const developmentEnvConfig = Object.assign({}, baseEnvConfig, {
  NODE_ENV: '"development"',
});

// env == production
const productionEnvConfig = Object.assign({}, baseEnvConfig, {
  NODE_ENV: '"production"',
});

// output
module.exports = {
  productionEnvConfig,
  developmentEnvConfig,
};
