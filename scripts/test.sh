#!/bin/bash

PWD_THIS="$(dirname $0)"
PWD_MODULE=$PWD_THIS/../packages/$1

rm -rf $PWD_THIS/../packages/core/dist $PWD_THIS/../packages/react/dist

source "${PWD_THIS}/shared/spinner.sh"
source "${PWD_THIS}/shared/colors.sh"

# Remove Jest assertion for invalid versions
export TS_JEST_DISABLE_VER_CHECKER=true >/dev/null 2>&1

# Install dependencies for module
(cd $PWD_MODULE && npm i --silent --force >/dev/null 2>&1)

# Run tests inside module root
(cd $PWD_MODULE && npx jest --noStackTrace --silent --detectOpenHandles --config $PWD_MODULE/jest.config.js)

# Capture tests exit status
EXIT_STATUS=$?

# Forcefully stop process which ran this script
exit $EXIT_STATUS