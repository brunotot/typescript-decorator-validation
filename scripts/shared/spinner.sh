#!/bin/bash

SPINNER_PID=
SPINNER_MSG_LEFT=
SPINNER_MSG_RIGHT=
INITIAL_SPINNER_STATE="✅"
EMPTY=""

LOADER_SEQUENCE_1=("⊏" "⊓" "⊐" "⊔")
LOADER_SEQUENCE_2=("⣾" "⣽" "⣻" "⢿" "⡿" "⣟" "⣯" "⣷")
LOADER_SEQUENCE_3=("𓃉𓃉𓃉" "𓃉𓃉∘" "𓃉∘°" "∘°∘" "°∘𓃉" "∘𓃉𓃉")
LOADER_SEQUENCE_4=("/" "-" "\\" "|")

LOADER_SEQUENCE=("${LOADER_SEQUENCE_4[@]}")

spinner() {
  local delay=0.1
  local idx=0

  while true; do
    echo -ne "\r$1${LOADER_SEQUENCE[$idx]}$2"
    idx=$(( (idx + 1) % ${#LOADER_SEQUENCE[@]} ))
    sleep $delay
  done
}

start() {
  SPINNER_MSG_LEFT="${1:-$EMPTY}"
  SPINNER_MSG_RIGHT="${2:-$EMPTY}"
  if [ "$PROD_ENV" == "true" ]; then
    echo -e "$SPINNER_MSG_LEFT${LOADER_SEQUENCE[0]}$SPINNER_MSG_RIGHT"
  else
    echo ""
    spinner "$SPINNER_MSG_LEFT" "$SPINNER_MSG_RIGHT" & SPINNER_PID=$!
  fi
}

stop() {
  if [ "$PROD_ENV" != "true" ]; then
    FINISH_REPLACER="${1:-$INITIAL_SPINNER_STATE}"
    kill $SPINNER_PID 
    echo -ne "\r$SPINNER_MSG_LEFT$FINISH_REPLACER$SPINNER_MSG_RIGHT"
  fi
}
