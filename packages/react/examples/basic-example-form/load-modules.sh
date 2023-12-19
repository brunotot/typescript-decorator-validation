#!/bin/bash

# tdv-core build
npm i --no-progress --prefix=../../../core --silent --force
npm run build:noTest --prefix=../../../core --silent

# tdv-react build
npm i --no-progress --prefix=../../../react --silent --force
rm -rf ../../../react/node_modules/tdv-core
npm run build:noTest --prefix=../../../react --silent

rm -rf libs
mkdir libs
mkdir libs/tdv-core
mkdir libs/tdv-react
cp ../../../core/package.json libs/tdv-core/package.json
cp ../../../react/package.json libs/tdv-react/package.json
cp -r ../../../core/dist libs/tdv-core/dist
cp -r ../../../react/dist libs/tdv-react/dist
rm -rf node_modules/.vite
npm i --silent --force