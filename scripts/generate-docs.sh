#!/bin/bash

PWD_THIS="$(dirname $0)"
PWD_ROOT="$PWD_THIS/.."

source "${PWD_THIS}/shared/spinner.sh"
source "${PWD_THIS}/shared/colors.sh"

for arg in "$@"; do
  if [ "$arg" == "--prod" ]; then
    export PROD_ENV=true
  fi
done

start "$(color $CYAN)1 $(color)" " $(color $GREY)5$(color) Installing dependencies..."
npm i --force --silent --no-progress
stop "/"

start "$(color $CYAN)2 $(color)" " $(color $GREY)5$(color) Building core..."
npm run build:noTest --prefix="$PWD_ROOT/packages/core" --silent
stop "/"

start "$(color $CYAN)3 $(color)" " $(color $GREY)5$(color) Building react..."
npm run build:noTest --prefix="$PWD_ROOT/packages/react" --silent
stop "/"

start "$(color $CYAN)4 $(color)" " $(color $GREY)5$(color) Generating documentation..."
(cd "$PWD_ROOT" && npx typedoc --logLevel None --excludeInternal)
stop "/"

start "$(color $CYAN)5 $(color)" " $(color $GREY)5$(color) Normalizing output..."
# Removes backslashes from all occurrences of "\@"
find "$PWD_ROOT/docs" -type f -exec sed -i 's/\\@/@/g' {} +
stop "/"

echo ""

if [ "$PROD_ENV" != "true" ]; then
  DIR=$(pwd)
  LINK_TEXT="Output"
  LINK_HREF="file://$DIR/docs/index.html"
  echo -e "\n    🚀 $(color $GREEN)Done!$(color)"
  echo -e "    ℹ️  $LINK_HREF\n"
  nohup xdg-open "$LINK_HREF" >/dev/null 2>&1 &
fi
