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

start "$(color $CYAN)1 $(color)" " $(color $GREY)5$(color) Cleaning cache..."
npm run clean --force --silent
stop "/"

start "$(color $CYAN)2 $(color)" " $(color $GREY)5$(color) Running build script..."
tsc --build
stop "/"

start "$(color $CYAN)3 $(color)" " $(color $GREY)5$(color) Installing dependencies..."
npm i --force --silent --no-progress
stop "/"

start "$(color $CYAN)4 $(color)" " $(color $GREY)5$(color) Generating documentation..."
npx typedoc --logLevel None
stop "/"

start "$(color $CYAN)5 $(color)" " $(color $GREY)5$(color) Normalizing output..."
# Removes backslashes from all occurrences of "\@"
find "$PWD_ROOT/docs" -type f -exec sed -i 's/\\@/@/g' {} +
stop "/"

echo ""

if [ "$PROD_ENV" != "true" ]; then
  LINK_TEXT="View generated output"
  LINK_HREF="http://127.0.0.1:5500/docs/"
  echo -e "\n    🚀 $(color $GREEN)Done!$(color)"
  echo -e "    $(color $CYAN)⭐ \e]8;;$LINK_HREF\e\\$LINK_TEXT\e]8;;\e\\"
  echo -e "$(color)"
fi
