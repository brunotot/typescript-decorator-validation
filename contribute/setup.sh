#!/bin/bash
mkdir tdd
cd tdd
mkdir libs
cd libs
git clone https://github.com/brunotot/typescript-decorator-validation.git core
cd core
npm install
cd ..
mkdir impl
cd impl
git clone https://github.com/brunotot/react-decorate-form.git react
cd react
npm install
cd ../../../
mkdir testing
cd testing
git clone https://github.com/brunotot/react-decorate-form.git react-test
cd react-test
git checkout testing
npm install
cd ../../
if command -v code; then
    code .
fi