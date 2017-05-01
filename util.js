

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


function usage(){
  console.log(`${FgBlue}`)
  console.log('Welcome to Dudy cli tools')
  console.log(`${FgYellow}`)
  console.log('A tool to imporve front-end dev. experience')


  console.log(`${FgBlue}`)
  console.log('Synopsis')
  console.log(`${FgYellow}`)


  console.log("[create app]")
  console.log('there are a few types:')
  console.log("  react-single-page-app: Single page application with react/redux/react-router..")
  console.log("  react-ssr-app: React application with server side rendering.")
  console.log("  antd-admin: Ant design mis platform")
  console.log("usage:")
  console.log("  dudy -c [project-type]")
  console.log("")

  console.log('[namespace generator]')
  console.log("Search root directory recursively, and generate index.js file to each first-order folder.")
  console.log('  dudy -i ./')


  console.log(`${FgBlue}`)
  console.log('Options')
  console.log(`${FgYellow}`)

  console.log('  --help(h), Display this usage guide')
  console.log('  --index(i) [path]')
  console.log('  --create(c) [project-type]')
  console.log(Reset)
}

function prompt_usage() {
  console.log(`${FgYellow}%s`, 'Greetings! Usage:')
  console.log('  create [your-project-name] [react-single-page-app]')
  console.log('  add    [sass]')
  console.log('')
  console.log('  type "exit" to quit')
  console.log(Reset)
}

function error(message) {
  console.log(`${FgRed}%s${Reset}`, message)
}


module.exports = {
    prompt_usage,
    error,
    usage
}