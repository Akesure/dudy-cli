#!/bin/sh
YELLOW="\x1b[33m"
RED='\033[0;31m'
NC='\033[0m'

print_title(){
  printf "${YELLOW}$1${NC}\n"
}

print_error(){
  printf "${RED}$1${NC}\n"
}



npm_init(){
  print_title "[RUN]npm init"
  cd $1
  npm init
  print_title "[RUN] npm install"
  npm i react react-dom react-router-dom redux redux-thunk qs md5 redux-persist md5 underscore zepto --save --registry https://registry.npm.taobao.org
  npm i -D webpack webpack-dev-server babel-core babel-plugin-transform-decorators stylus stylus-loader url-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save --registry https://registry.npm.taobao.org
  npm i -D gulp gulp-replace gulp-rename --save --registry https://registry.npm.taobao.org
  npm i -D file-loader babel-loader express style-loader css-loader sass-loader  --save --registry https://registry.npm.taobao.org
  npm i -D command-line-args camelcase uppercamelcase --save --registry https://registry.npm.taobao.org
}

