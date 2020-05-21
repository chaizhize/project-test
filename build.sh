#!/bin/bash
git pull
npm install
if [ -d ./dist ];then
	echo "removing dist dir"
	rm -rf ./dist
fi
npm run build:prod
echo 'success'


