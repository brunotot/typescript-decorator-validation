#!/bin/bash

PWD_THIS="$(dirname $0)"
PWD_MODULE=$PWD_THIS/../packages/core
API_KEY=AIzaSyDe8OgFlm_W6qegW3cY0gaNoyT5ZbUUJvo

# Function to show usage and description
show_help() {
  echo "Usage: $0 [options] languages"
  echo "Options:"
  echo "  -h, --help     Show this help message"
  echo "  languages      List of languages to autotranslate"
  echo "Description:"
  echo "  This script generates translations for the specified languages."
  echo "  Valid languages are 2-character codes, excluding 'en' (default)."
}

# Check if there are no arguments or if the "--help" option is used
if [ $# -eq 0 ] || [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  show_help
  exit 0
fi

# Extract the languages from the provided arguments
languages=()
for arg in "$@"; do
  # Check if the argument is not an option (doesn't start with '-')
  if [[ ! "$arg" == -* ]]; then
    languages+=("$arg")
  fi
done

# Define the default language (English)
default_lang="en"

# Function to check if a language is valid (2-character code, not equal to default)
is_valid_language() {
  local lang="$1"
  if [[ ${#lang} -eq 2 && "$lang" != "$default_lang" ]]; then
    return 0
  else
    return 1
  fi
}

# Check if at least one language is provided
if [ ${#languages[@]} -eq 0 ]; then
  echo "Error: At least one language must be provided."
  show_help
  exit 1
fi

# Loop through the provided languages and generate translations
for lang in "${languages[@]}"; do
  # Check if the language is valid
  if is_valid_language "$lang"; then
    i18n-auto-translation -k "$API_KEY" -d $PWD_MODULE/src/messages/translations -t "$lang" -f "$default_lang"
  else
    echo "Error: Invalid language code: $lang. Skipping..."
  fi
done
