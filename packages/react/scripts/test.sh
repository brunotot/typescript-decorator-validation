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

echo -e "$(color $CYAN)1 $(color)/ $(color $GREY)3$(color) Setting environment variables..."
export TS_JEST_DISABLE_VER_CHECKER=true >/dev/null 2>&1

echo -e "$(color $CYAN)2 $(color)/ $(color $GREY)3$(color) Installing dependencies..."
npm i --silent --force >/dev/null 2>&1

echo -e "$(color $CYAN)3 $(color)/ $(color $GREY)3$(color) Running test suites..."
jest