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

print(){
  printf "${YELLOW}$1${NC}\n"
}


npm_init(){
  print_title "[RUN]npm init"
  cd $1
  npm init
  print_title "[RUN] npm install"
  print_title "  install dependencies"

  cnpm i autoprefixer react react-dom react-router-dom \
      react-redux redux redux-thunk qs md5 redux-persist \
      animated inline-style-prefixer \
      react-tap-event-plugin axios \
      md5 underscore zepto --save 

  print_title "  install devDependencies"
  cnpm i -D  redbox-react webpack \
    webpack-dev-server babel-core babel-plugin-transform-decorators \
    stylus stylus-loader url-loader babel-preset-es2015 babel-preset-stage-0 \
    babel-preset-react babel-polyfill \
    gulp gulp-replace gulp-rename \
    file-loader babel-loader express style-loader \
    less less-loader css-loader node-sass sass-loader \
    command-line-args camelcase uppercamelcase 
}

