#!/bin/bash

VERSION="$1"

CLR_PREFIX="\[\033["
CLR_SUFFIX="m\]"

GREEN="1;32"
RESET="0"

clr() {
  local colorCode="${1:-$RESET}"
  echo "$CLR_PREFIX$colorCode$CLR_SUFFIX"
}

echo -e "$(clr GREEN)1/6$(clr) Cleaning cache..."
npm cache clean --force --silent

echo -e "$(clr GREEN)2/6$(clr) Installing dependencies..."
npm i --force --silent

echo -e "$(clr GREEN)3/6$(clr) Running build script..."
npm run build

echo -e "$(clr GREEN)4/6$(clr) Bumping version to $VERSION..."
npm version $VERSION --force --silent

echo -e "$(clr GREEN)5/6$(clr) Publishing package..."
npm publish --access=public --silent

echo -e "$(clr GREEN)6/6$(clr) Pushing changes..."
git add .
git commit -m "bump react $VERSION version"
git push
