const util = require("util");
const child_process = require("child_process");
const exec = util.promisify(child_process.exec);

//新建博客命名，这里以年月日时分秒命名，可自定义修改
function getCreateTimeAsFileName() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  var time =  year + "-" + month +"-" + day +  "day" + hour +  "h" + minute +  "m" + second +  "s";

  return time;
}


// execute command function

async function executeCommand() {
  const fileName = getCreateTimeAsFileName() + ".md";
  const { stdout, stderr } = await exec("hugo new posts/" + fileName, {
    cwd: app.fileManager.vault.adapter.basePath,
  });
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
  if (stdout) {
    new Notice("New Blog Created[" + fileName + "]");
  } else {
    new Notice("New Blog Create Faild. " + stderr);
  }
}

module.exports = async function (context, req) {
  await executeCommand();
};