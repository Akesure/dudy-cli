#!/usr/bin/env node
const readline = require("readline")
const commandLineArgs = require("command-line-args")
const renew_idx = require("./renew_idx")




const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"
const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"
const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"
function prompt_usage() {
  console.log(`${FgYellow}%s`, 'Greetings! Usage:')
  console.log('  create [your-project-name] [react-single-page-app]')
  console.log('  add    [sass]')
  console.log('')
  console.log('  type "exit" to quit')
  console.log(Reset)
}

function error(messsage) {
  console.log(`${FgRed}%s${Reset}`, message)
}


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


function usage(){
  console.log(`${FgBlue}`)
  console.log('Dudy cli tools')
  console.log(`${FgYellow}`)



  console.log(`${FgBlue}`)
  console.log('Synopsis')
  console.log(`${FgYellow}`)

  console.log('  dudy idx ./')
  console.log('  dudy shell')

  console.log('Options')

  console.log('  --help(h), Display this usage guide')
  console.log('  --index(i) [path], Generate es6 exports to index.js')
  console.log('  --shell(s), open dudy shell')
  console.log(Reset)
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