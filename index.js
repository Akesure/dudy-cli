#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const readline = require("readline")
const commandLineArgs = require("command-line-args")
const renew_idx = require("./renew_idx")
const {usage, prompt_usage, error} = require("./util")

const {spawn} = require("child_process")

const add_npm_script = require("./add_npm_script")



function prompt() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'dudy> '
  })

  rl.prompt()


  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'hello':
        console.log('world!');
        break;
      
      default:
        prompt_usage()
        break;
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);

  });

}



/**
 * 程序入口
 */
function run(){

  const optionDefinitions = [
    { name: 'help', alias: 'h', type: Boolean, defaultOption : true},
    { name: 'index', alias : 'i'},
    { name: 'shell', alias: 's'},
    { name: 'create', alias: 'c'},
    { name: 'name', alias: 'n'},
    { name: 'version', alias : 'v'},
    { name: 'plugin', alias : 'p'},
    { name: 'js' },
    { name: 'html'}
 ]

  const options = commandLineArgs(optionDefinitions)

  if(Object.keys(options).length == 0){
    options.help = true
  }
  if(options.help) {
    usage()
  } 
  else {
    if(options.hasOwnProperty('shell')) {
      prompt()
    } else if(options.hasOwnProperty("index")) {

      const dir = options.index
      if(!dir) {
        error('path is needed!')  
        return
      }
      renew_idx(dir)

    } else if (options.hasOwnProperty('version')){

      const pkgJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')))
      console.log("dudy-cli version " + pkgJson.version)

    } 
    else if (options.hasOwnProperty('create')) {

      const prj_type = options.create

      switch(prj_type) {
        case "react-single-page-app" :

          const child = spawn('sh' , [ path.resolve(__dirname, "sh/" + prj_type + ".sh"), options.name ], {
              stdio: 'inherit' 
          })

          child.on('exit', function(){
            add_npm_script(path.resolve(process.cwd(), options.name, "package.json"))
          })
          break
        default:
          error("unkown project type " + prj_type)
      } 
    } else if (options.hasOwnProperty('plugin')) {
      const plugin = options.plugin
      if(plugin === 'qiniu') {
        const pluginFunction = require(__dirname + "/plugins/" + options.plugin + "/index.js")
        pluginFunction(options.js, options.html)
      }

    }


  }
}

module.exports = run