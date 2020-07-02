#!/usr/bin/env node
// 告诉系统，下面这个脚本，使用nodejs来执行
console.log(process.argv); // [node程序的路径,脚本存放的位置,[attr]]
// 开启子进程，在子进程内调用git命令
const child_process = require("child_process");

// 不仅是git命令，包括系统命令、其他cli命令都可以在这里执行。特别是系统命令，使用系统命令对文件目录进行操作，效率比fs高到不知道哪里去了
let subProcess = child_process.exec("node -v", function(err, stdout) {
  if (err) console.log(err);
  console.log(stdout);
  subProcess.kill();
});
