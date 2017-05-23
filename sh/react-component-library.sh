#!/bin/bash
echo 'create react-single-page-app'
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
mk=1
if [ -d "$targetpath/$prj" ]; then
  print_error 'Target directory already exists.'

  read -p "Do you wish to continue?[y/n]" yn
  case $yn in
    [Yy]* ) mk=0; break;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
  esac
fi

if [ $mk -eq 1 ];then
  mkdir $targetpath/$prj
  cp -r $basepath/react-component-library/* $targetpath/$prj/ 
  mkdir $targetpath/$prj/examples
  cp $basepath/react-single-page-app/* $targetpath/$prj/examples/
  cp $basepath/react-single-page-app/.babelrc $targetpath/$prj/
  cp $basepath/react-single-page-app/.babelrc $targetpath/$prj/examples
  npm_init_library $targetpath/$prj/

  cp $targetpath/$prj/package.json $targetpath/$prj/pkg.bak
  cp $targetpath/$prj/examples/package.json $targetpath/$prj/
  cd $targetpath/$prj
  cnpm install
  cp $targetpath/$prj/pkg.bak $targetpath/$prj/package.json
  dudy -i $targetpath/$prj/src

fi






