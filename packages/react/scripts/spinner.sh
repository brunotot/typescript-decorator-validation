#!/bin/bash

SPINNER_PID=
SPINNER_MSG_LEFT=
SPINNER_MSG_RIGHT=
INITIAL_SPINNER_STATE="✅"
EMPTY=""

LOADER_SEQUENCE_1=("⊏" "⊓" "⊐" "⊔")
LOADER_SEQUENCE_2=("⣾" "⣽" "⣻" "⢿" "⡿" "⣟" "⣯" "⣷")
LOADER_SEQUENCE_3=("𓃉𓃉𓃉" "𓃉𓃉∘" "𓃉∘°" "∘°∘" "°∘𓃉" "∘𓃉𓃉")

LOADER_SEQUENCE=("|" "/" "-" "\\")

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
    echo ""
    spinner "$SPINNER_MSG_LEFT" "$SPINNER_MSG_RIGHT" & SPINNER_PID=$!
}

stop() {
    FINISH_REPLACER="${1:-$INITIAL_SPINNER_STATE}"
    kill $SPINNER_PID 
    echo -ne "\r$SPINNER_MSG_LEFT$FINISH_REPLACER$SPINNER_MSG_RIGHT"
}

#echo "Starting the operation..."
#start "1 " " 3"
#sleep 5
#stop "/"
#echo "Continuing with other tasks..."
