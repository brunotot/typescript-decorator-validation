#!/bin/bash

VERSION="$1"

CLR_PREFIX="\033["
CLR_SUFFIX="m"

CYAN="0;34"
GREEN="1;32"
RESET="0"
GREY="1;30"

color() {
  local colorCode="${1:-$RESET}"
  echo "$CLR_PREFIX$colorCode$CLR_SUFFIX"
}

echo -e "$(color $CYAN)1 $(color)/ $(color $GREY)6$(color) Cleaning cache..."
npm cache clean --force --silent

echo -e "$(color $CYAN)2 $(color)/ $(color $GREY)6$(color) Installing dependencies..."
npm i --force --silent

echo -e "$(color $CYAN)3 $(color)/ $(color $GREY)6$(color) Running build script..."
npm run build

echo -e "$(color $CYAN)4 $(color)/ $(color $GREY)6$(color) Bumping version to $VERSION..."
npm version $VERSION --force --silent --no-warnings

echo -e "$(color $CYAN)5 $(color)/ $(color $GREY)6$(color) Publishing package..."
npm publish --access=public --silent

echo -e "$(color $GREEN)6 / 6$(color) Pushing changes..."
git add .
git commit -m "bump react $VERSION version" --quiet -u
git push --quiet -u --no-progress
