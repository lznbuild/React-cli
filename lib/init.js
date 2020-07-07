const { promisify } = require('util') 


const figlet = promisify(require('figlet'))


const clear = require('clear')


const chalk = require('chalk')


const log = content => console.log(chalk.green(content)); 

const { clone } = require('./download')


const spawnOn = async (shell,...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(process.platform === "win32" ? `${shell}.cmd` : shell, ...args);
    proc.stdout.pipe(process.stdout) 
    proc.stderr.pipe(process.stderr) 

    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {

  clear()

  const data = await figlet('Welcome')


  log(data) 

  //clone 
  log(`📕创建项目${name}`)
  await clone("github:lznbuild/js_xls", name);


  //自动安装依赖 
  log('🔧安装依赖中')
  await spawnOn("yarn", ["install"], { cwd: `./${name}` });
  
  log(`🆗安装完成`) 


  // 启动
  await spawnOn('yarn',['start'],{cwd:`./${name}`})

  
}