#!/bin/bash

commonpath=$(cd `dirname $0`; pwd)
. ${commonpath}/common.sh
targetpath=$(pwd)
echo $targetpath
basepath=$(cd `dirname $0`; cd ../app/; pwd)
prj=$1

## 没有输入项目名称
if [ -z $prj ]; then
  print_error 'Project name is empty'
  exit
fi
## 如果目录存在，就退出
if [ -d "$targetpath/$prj" ]; then
  printf_error 'Target directory already exists${NC}'
  exit
fi

mkdir $targetpath/$prj
cp -r $basepath/react-single-page-app/* $targetpath/$prj/ 

npm_init $targetpath/$prj





