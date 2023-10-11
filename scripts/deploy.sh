#!/bin/bash

PWD_THIS="$(dirname $0)"
PWD_ROOT="$PWD_THIS/.."
PWD_MODULE=$PWD_ROOT/packages/$1

source "${PWD_THIS}/shared/spinner.sh"
source "${PWD_THIS}/shared/colors.sh"

APP="$1"
VERSION="$2"

start "$(color $CYAN)1 $(color)" " $(color $GREY)8$(color) Cleaning cache..."
(cd $PWD_MODULE && npm cache clean --force --silent)
stop "/"

start "$(color $CYAN)2 $(color)" " $(color $GREY)8$(color) Installing dependencies..."
(cd $PWD_MODULE && npm i --force --silent --no-progress)
stop "/"

echo -e "\n$(color $CYAN)3 $(color)/ $(color $GREY)8$(color) Running ESLint..."
(cd $PWD_ROOT && npm run lint --silent)

if [ $? -ne 0 ]; then
  echo -e "    ❌ $(color $RED)Error!$(color $GREY)"
  echo -e "    ℹ️  Deployment stopped due to ESLint throwing errors$(color)\n"
  exit 1
fi

# moves the cursor up by one line on the terminal
printf "\033[1A"

echo -e "\n$(color $CYAN)4 $(color)/ $(color $GREY)8$(color) Running tests..."
npm test --silent --prefix "$PWD_MODULE"

if [ $? -ne 0 ]; then
  echo -e "    ❌ $(color $RED)Error!$(color $GREY)"
  echo -e "    ℹ️ Deployment stopped due to some tests failing$(color)\n"
  exit 1
fi

# moves the cursor up by one line on the terminal
printf "\033[1A"

start "$(color $CYAN)5 $(color)" " $(color $GREY)8$(color) Running build script..."
(cd $PWD_MODULE && npm run build:noTest >/dev/null 2>&1)
stop "/"

start "$(color $CYAN)6 $(color)" " $(color $GREY)8$(color) Bumping version to $VERSION..."
UPDATED_VERSION=$(npm version $VERSION --force --silent --no-progress)
VERSION=$(echo "$UPDATED_VERSION" | sed '1d' | cut -d 'v' -f 2)
VERSION_NUMBER="${VERSION#v}"
stop "/"

start "$(color $CYAN)7 $(color)" " $(color $GREY)8$(color) Publishing package..."
(cd $PWD_MODULE && npm publish --access=public --silent)
stop "/"

start "$(color $GREEN)8 $(color)" " $(color $GREEN)7 $(color)Pushing changes..."
git add .
bash $PWD_THIS/commit.sh --group=release --message="publish tdv-$APP v$VERSION"
git push --quiet -u --no-progress >/dev/null 2>&1
stop "/"

echo -e "\n\n    🚀 $(color $GREEN)Done!$(color)\n    ⭐ $(color $CYAN)tdv-$APP $(color)v$VERSION_NUMBER\n"
