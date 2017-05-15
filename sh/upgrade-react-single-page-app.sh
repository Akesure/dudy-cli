#!/bin/bash
echo 'upgrade'

commonpath=$(cd `dirname $0`; pwd)
. ${commonpath}/common.sh
targetpath=$(pwd)
basepath=$(cd `dirname $0`; cd ../app/; pwd)


print_title "Upgrading..."
if [ ! -d $targetpath/build-scripts ]; then
  print_error "Directory build-scripts not found! Are u sure executing this in a dudy project."
fi

print 'build script found, continue upgrade'

print "[upgrade] buildscripts"
cp $basepath/react-single-page-app/build-scripts/* $targetpath/build-scripts/

print "[upgrade] file timeplates" 
cp $basepath/react-single-page-app/file-templates/* $targetpath/file-templates

if [ ! -d $targetpath/src/image ]; then
  mkdir -p $targetpath/src/image 
  cp $basepath/react-single-page-app/src/image/demo.jpeg $targetpath/src/image/
fi

if [ ! -d $targetpath/src/action ]; then
  mkdir -p $targetpath/src/action
fi


npm_init $targetpath
