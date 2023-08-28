#!/bin/bash

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

VERSION="$1"

echo -e "$(color $CYAN)1 $(color)/ $(color $GREY)6$(color) Cleaning cache..."
npm cache clean --force --silent

echo -e "$(color $CYAN)2 $(color)/ $(color $GREY)6$(color) Installing dependencies..."
npm i --force --silent

echo -e "$(color $CYAN)3 $(color)/ $(color $GREY)6$(color) Running build script..."
npm run build >/dev/null 2>&1

echo -e "$(color $CYAN)4 $(color)/ $(color $GREY)6$(color) Bumping version to $VERSION..."
UPDATED_VERSION=$(npm version $VERSION --force --silent)
VERSION=$(echo "$UPDATED_VERSION" | sed '1d' | cut -d 'v' -f 2)
VERSION_NUMBER="${VERSION#v}"

echo -e "$(color $CYAN)5 $(color)/ $(color $GREY)6$(color) Publishing package..."
npm publish --access=public --silent

echo -e "$(color $GREEN)6 $(color)/ $(color $GREEN)6 $(color)Pushing changes..."
git add .
git commit -m "bump react $VERSION version" --quiet -u
git push --quiet -u --no-progress >/dev/null 2>&1

echo -e "\n    🚀 $(color $GREEN)Done!$(color)\n    ⭐ v$VERSION_NUMBER\n"
