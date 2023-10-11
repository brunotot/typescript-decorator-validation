#!/bin/bash

function show_available_groups() {
  echo "Available group identifiers:"
  echo "  ✨ feat ---------> for new features or enhancements"
  echo "  🐛 fix ----------> for bug fixes"
  echo "  📝 docs ---------> for documentation updates"
  echo "  🔄 chore --------> for routine maintenance tasks or refactoring"
  echo "  🚀 perf ---------> for performance improvements"
  echo "   ♻️ refactor -----> for code refactoring"
  echo "  🚨 test ---------> for adding or modifying tests"
  echo "  💄 style --------> for code style and formatting changes"
  echo "  🚢 release ------> for release-related tasks"
  echo "  🌐 i18n ---------> for internationalization and localization updates"
  echo "  🛠️  tool ---------> for adding or updating developer tools"
  echo "  🚦 ci -----------> for continuous integration and build process changes"
  echo "  📦 dep ----------> for dependency updates"
  echo "  🛡️  security -----> for addressing security concerns"
  echo "  📊 analytics ----> for adding analytics or metrics"
  echo "  🌐 web ----------> for web-related tasks"
  echo "  🧪 automation ---> for automation of tasks"
  echo "  🔍 search -------> for improving search functionality"
}

# Function to display usage instructions
function show_help() {
  echo "Usage: bash commit.sh [--ticket=<ticket-id>] --group=<group-name> --message=<commit-message>"
  echo ""
  echo "Options:"
  echo "  --ticket=<ticket-id>        Specify the ticket or issue ID."
  echo "  --group=<group-name>        Specify the commit group from the list of predefined groups."
  echo "  --message=<commit-message>  Specify the commit message."
  echo "  --help                      Display this help message."
  echo ""
  echo "Examples:"
  echo "  bash commit.sh --ticket=123 --group=fix --message=\"Fix a critical bug\""
  echo "  bash commit.sh --group=feat --message=\"Add new feature\""
  echo ""
  show_available_groups
}

# Parse command line arguments
for arg in "$@"; do
  case $arg in
    --help)
      show_help
      exit 0
      ;;
    --ticket=*)
      ticket="${arg#*=}"
      ;;
    --group=*)
      group="${arg#*=}"
      ;;
    --message=*)
      message="${arg#*=}"
      ;;
  esac
done

# Check if --message is provided
if [ -z "$message" ]; then
  echo "Error: --message is a mandatory parameter."
  exit 1
fi

# Define commit groups and emojis
default_emoji="🎲"
groups=("feat"  "fix"  "docs"  "chore"  "perf"  "refactor"  "test"  "style"  "release"  "i18n"  "tool"  "ci"  "dep"  "security"  "analytics"  "web"  "automation"  "search")
emojis=( "✨"    "🐛"   "📝"    "🔄"     "🚀"      "♻️"       "🚨"    "💄"      "🚢"      "🌐"    "🛠️"  "🚦"   "📦"     "🛡️"         "📊"      "🌐"      "🧪"        "🔍")

# Find the corresponding emoji for the selected group
for ((i=0; i<${#groups[@]}; i++)); do
  if [ "${groups[$i]}" == "$group" ]; then
    emoji="${emojis[$i]}"
    break
  fi
done

# Set default emoji if not found inside groups
if [[ ! " ${groups[*]} " =~ " $group " ]]; then
  emoji=$default_emoji
fi

# Construct the commit message
commit_message="$emoji [$group]: $message"

# Append ticket ID if provided
if [ -n "$ticket" ]; then
  commit_message="$emoji [$group]: $message (#$ticket)"
fi

# Add all changed files to staging
git add .

npm run lint --prefix ../

# Perform the commit
git commit -m "$commit_message" --quiet -u --no-verify

