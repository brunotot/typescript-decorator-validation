 <h1 align="center">:rocket: TypeScript Decorator Validation :rocket:</h1>

<p align="center">:star: Class entity validations made easy with the help of 
 <a href="https://www.typescriptlang.org/docs/handbook/decorators.html">@Decorators</a>
</p>
<p align="center">:star: Allows strict type checking when applying decorator validators</p>
<p align="center">:star: Works perfectly with existing TypeScript-first applications</p>

<p align="center">
 <a href="https://npmcharts.com/compare/typescript-decorator-validation?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://www.npmjs.com/package/typescript-decorator-validation">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/typescript-decorator-validation.svg" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/typescript-decorator-validation/graphs/contributors">
  <img alt="Contributors" src="https://img.shields.io/github/contributors/brunotot/typescript-decorator-validation" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/typescript-decorator-validation/graphs/commit-activity">
  <img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/>
 </a>
 
 <a href="https://costlydeveloper.github.io/ngx-awesome-popup/">
  <img alt="Awesome badge" src="https://awesome.re/badge.svg" height="20"/>
 </a>
</p>

## Table of Contents

- [Installation](#installation)
- [Contribute](#contribute)

## Installation

1. Install library dependency

```
npm install typescript-decorator-validation
```

2. Allow experimental decorators configuration in your `tsconfig.json`. This removes IDE errors which could pop-up
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    /* ... */
  }
}
```

3. Add babel configuration to your `tsconfig.json`. This allows for type-safety checking

```ts
{
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: ["@babel/preset-typescript"],
}
```

## Contribute

1. Open bash terminal

2. Change directory to your desired position

3. Setup the environment by calling
```
bash <(curl -s https://raw.githubusercontent.com/brunotot/typescript-decorator-validation/main/contribute/setup.sh)
```
This will create all necessary directories and prepare development environment for a quick start to contributing to this library.
You can see here what are the exact commands being executed when running the `setup.sh` script.

```bash
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
```

4. Inside your editor open integrated terminal and navigate to the testing application
```bash
cd testing/react-test
```

5. Start the development server
```bash
npm run dev
```
