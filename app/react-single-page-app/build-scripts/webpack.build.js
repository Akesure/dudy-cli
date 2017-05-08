#!/usr/bin/env node
const webpack = require("webpack")
const process = require('process')
const path = require('path')
const commandLineArgs = require("command-line-args")
const fs = require("fs")

const WebpackDevServer = require("webpack-dev-server")


const node_env = process.env.NODE_ENV.trim()
const FgRed = "\x1b[31m"

const Reset = "\x1b[0m"

const before_build = require("./before_build")
const create_entry = require('./create_entry')



// 命令行参数
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, defaultOption: true },
  { name: 'entry', alias: 'e' },
]
const options = commandLineArgs(optionDefinitions)




const {dev_config, dll_config} = require("./webpack.inc.js")


const {entry} = options

if(!(node_env === 'development' || node_env === 'production')) {
  console.log(`${FgRed}%s${Reset}`, "process.env.NODE_ENV should be either development or production")
  process.exit()
}

if(!entry) {
  console.log(`${FgRed}%s${Reset}`, "--entry should be specified.")
  process.exit()
}

function compile_dll(dll_conf, callback) {
  if (!fs.existsSync(path.resolve(__dirname, "../dist", 'js/react-manifest.json'))) {
    const compiler = webpack(dll_conf)
    compiler.run(function (err, stats) {
      callback()
    })
  } else {
    callback()
  }
}

// 创建enry如果没有创造
create_entry(entry, () => {
  if (node_env === 'development') {
    // Build dll module if not exists
    before_build(entry)
    compile_dll(dll_config(), function () {
      const webpack_conf = dev_config(entry)
      const compiler = webpack(webpack_conf)
      const server = new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, "../dist"),
        stats: { colors: true },
        inline : true,

        // 如果要使用https协议需要引入证书文件
        // 具体参考webpack-dev-server的文档
        proxy : {
          '/api/*' : {
            target : "http://sometest.com",
            logLevel : 'debug',
            secure :  false,
            changeOrigin: true
          }
        }
      })
      server.listen("3000")
    })


  } else if (process.env.NODE_ENV === 'production') {
    const webpack_conf = release_config(entry)
    const compiler = webpack(webpack_conf)
    compiler.run(function (err, stat) {

    })
}
})
