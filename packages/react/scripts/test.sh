#!/bin/bash

. ./scripts/spinner.sh
. ./scripts/colors.sh

start "$(color $CYAN)1 $(color)" " $(color $GREY)3$(color) Setting environment variables..."
export TS_JEST_DISABLE_VER_CHECKER=true >/dev/null 2>&1
stop "/"

start "$(color $CYAN)2 $(color)" " $(color $GREY)3$(color) Installing dependencies..."
npm i --silent --force >/dev/null 2>&1
stop "/"

echo -e "\n$(color $CYAN)3 $(color)/ $(color $GREY)3$(color) Running test suites..."
npx jest