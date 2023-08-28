#!/bin/bash

. ./../../scripts/spinner.sh
. ./../../scripts/colors.sh

export TS_JEST_DISABLE_VER_CHECKER=true >/dev/null 2>&1
npm i --silent --force >/dev/null 2>&1
npx jest --config ./../../packages/react/jest.config.js --noStackTrace --silent --detectOpenHandles
EXIT_STATUS=$?
exit $EXIT_STATUS