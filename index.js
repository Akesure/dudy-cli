#!/usr/bin/env node
const path = require('path')
const readline = require("readline")
const commandLineArgs = require("command-line-args")
const renew_idx = require("./renew_idx")
const {usage, prompt_usage, error} = require("./util")

const {spawnSync} = require("child_process")



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

    } else if (options.hasOwnProperty('create')) {

      const prj_type = options.create

      switch(prj_type) {
        case "react-single-page-app" :

          const result = spawnSync('sh', [path.resolve(__dirname, "sh/" + prj_type + ".sh"), options.name])
          const output = result.output + ""
          break
        default:
          error("unkown project type " + prj_type)

      }


    }
  }
}

module.exports = run