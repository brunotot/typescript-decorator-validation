#!/bin/bash

. ./../../scripts/spinner.sh
. ./../../scripts/colors.sh

VERSION="$1"

start "$(color $CYAN)1 $(color)" " $(color $GREY)7$(color) Cleaning cache..."
npm cache clean --force --silent
stop "/"

start "$(color $CYAN)2 $(color)" " $(color $GREY)7$(color) Installing dependencies..."
npm i --force --silent --no-progress
stop "/"

echo -e "\n$(color $CYAN)3 $(color)/ $(color $GREY)7$(color) Running tests..."
./../../scripts/test.sh

if [ $? -ne 0 ]; then
  echo -e "\n    ❌ $(color $RED)Error!$(color $GREY)\n    ℹ️  Deployment stopped due to some tests failing\n"
  exit 1
fi

start "$(color $CYAN)4 $(color)" " $(color $GREY)7$(color) Running build script..."
npm run build >/dev/null 2>&1
stop "/"

start "$(color $CYAN)5 $(color)" " $(color $GREY)7$(color) Bumping version to $VERSION..."
UPDATED_VERSION=$(npm version $VERSION --force --silent --no-progress)
VERSION=$(echo "$UPDATED_VERSION" | sed '1d' | cut -d 'v' -f 2)
VERSION_NUMBER="${VERSION#v}"
stop "/"

start "$(color $CYAN)6 $(color)" " $(color $GREY)7$(color) Publishing package..."
npm publish --access=public --silent
stop "/"

start "$(color $GREEN)7 $(color)" " $(color $GREEN)7 $(color)Pushing changes..."
git add .
git commit -m "bump react $VERSION version" --quiet -u
git push --quiet -u --no-progress >/dev/null 2>&1
stop "/"

echo -e "\n\n    🚀 $(color $GREEN)Done!$(color)\n    ⭐ v$VERSION_NUMBER\n"
