#!/bin/bash

PWD_THIS="$(dirname $0)"

source "${PWD_THIS}/../../../../scripts/shared/spinner.sh"
source "${PWD_THIS}/../../../../scripts/shared/colors.sh"

echo -e "\nPerforming optimizations..."

echo -e "\n[1/3] module: $(color $GREEN)tdv-core$(color)"

start "$(color $CYAN)1 $(color)" " $(color $GREY)8$(color) Cleaning $(color $CYAN)tdv-core$(color) cache"
rm -rf ../../../core/dist
stop "/"


start "$(color $CYAN)2 $(color)" " $(color $GREY)8$(color) Installing $(color $CYAN)tdv-core$(color) dependencies"
npm i  --no-progress --prefix=../../../core --silent
stop "/"

start "$(color $CYAN)3 $(color)" " $(color $GREY)8$(color) Building $(color $CYAN)tdv-core$(color) package"
npm run build:noTest --prefix=../../../core --silent
stop "/"

echo -e "\n\n[2/3] module: $(color $GREEN)tdv-react$(color)"

start "$(color $CYAN)4 $(color)" " $(color $GREY)8$(color) Cleaning $(color $CYAN)tdv-react$(color) cache"
rm -rf ../../../react/dist
stop "/"

start "$(color $CYAN)5 $(color)" " $(color $GREY)8$(color) Installing $(color $CYAN)tdv-react$(color) dependencies"
npm i  --no-progress --prefix=../../../react --silent
stop "/"

start "$(color $CYAN)6 $(color)" " $(color $GREY)8$(color) Building $(color $CYAN)tdv-react$(color) package"
npm run build:noTest --prefix=../../../react --silent
stop "/"

echo -e "\n\n[3/3] module: $(color $GREEN)basic-example-form$(color)"

start "$(color $CYAN)7 $(color)" " $(color $GREY)8$(color) Deleting $(color $CYAN)vite$(color) cache"
rm -rf node_modules/.vite
stop "/"

start "$(color $CYAN)8 $(color)" " $(color $GREY)8$(color) Installing local dependencies"
npm i  --no-progress --silent
stop "/"

echo -e "\n\n🚀 Optimizations finished, starting $(color $GREEN)vite$(color)...\n"

npm run build --silent && vite
