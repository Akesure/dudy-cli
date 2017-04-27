#!/usr/bin/env node
const readline = require("readline")
const commandLineArgs = require("command-line-args")
const renew_idx = require("./renew_idx")
const {usage, prompt_usage, error} = require("./util")


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
    { name: 'shell', alias: 's'}
  ]

  const options = commandLineArgs(optionDefinitions)

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

    }
  }
}

module.exports = run