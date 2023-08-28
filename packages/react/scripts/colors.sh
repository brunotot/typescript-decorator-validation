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