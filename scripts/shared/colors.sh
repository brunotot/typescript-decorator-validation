#!/bin/bash

CLR_PREFIX="\033["
CLR_SUFFIX="m"

CYAN="0;34"
GREEN="1;32"
GREY="1;30"
RED="1;31"

RESET="0"

color() {
  if [ "$PROD_ENV" == "true" ]; then
    echo ""
  else
    local colorCode="${1:-$RESET}"
    echo "$CLR_PREFIX$colorCode$CLR_SUFFIX"
  fi
}