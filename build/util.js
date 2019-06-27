const fs = require('fs');
const path = require('path');
const Colors = require('colors');

/**
 * @description 校验项目目录是否存在
 * @param {string} path
 * @return {boolean}
 */
async function verifyFileExist(path) {
  let exist = false;
  try {
    exist = await fs.access(path, function (err) { })
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
  return exist;
}

/**
 * @description 删除上一次生成的文件
 * @param {string} path
 */
async function reomveLastBuildFile(path) {
  try {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

/**
 * @description 校验初始化参数 
 * @param { object } args //progress.args,这里使用的node-arg处理过的参数
 */
function verifyBuildParams(args) {
  // 是否通过验证(默认通过)
  let verified = true;
  // 项目名称
  const projectName = args.PROJECT_NAME;
  // 项目原始目录
  const projectSroucePath = path.join(__dirname, '..', `src/projects/${projectName}`);
  // 校验传入参数
  if (!Boolean(projectName)) {
    console.info(Colors.magenta('项目名称不能为null!!!'));
    console.info(Colors.magenta('给劳资写清楚了啊!!!'));
    console.info(Colors.magenta('设置这个啊 --PROJECT=project_name !!!'));
    console.info(Colors.magenta('沙雕!!!'));
    verified = false;
  }
  if(!fs.existsSync(projectSroucePath)){
    console.info(Colors.magenta('老铁，你TM写的项目名称不对啊，没找着啊!!!'));
    console.info(Colors.magenta('老铁!!!，这个路径下的啊 '+ path.join(__dirname, '..', `src/projects/`) + '!!!'));
    console.info(Colors.magenta('你是不是沙雕了!!!'))
    verified = false;
  }
  !verified&&process.exit(0);
  return verified;
}

const FN_LIST = {
  verifyFileExist,
  reomveLastBuildFile,
  verifyBuildParams
}
// output
module.exports = FN_LIST;