#!/usr/bin/env bash

chkarg(){
  if [ ! -z ${1+x} ]; then
    return 0
  else
    return 1
  fi
}


filename=$1
version=$2

update_version(){
  if chkarg $2; then
    /usr/local/bin/node index.js $filename $version
  else
    printf '\nplease provide arguments...\n$filename $version\n\n'
  fi 
}

update_version $1 $2