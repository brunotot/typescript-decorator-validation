 <h1 align="center">:rocket: React Decorate Form :rocket:</h1>

<p align="center">:rocket: Form validations made easy with the help of decorators</p>
<p align="center">:zap: Allows strict type checking when applying validators</p>
<p align="center">:star: Works perfectly with existing React form components</p>
<h2 align="center">
  <a href="https://stackblitz.com/edit/react-ts-d3swd2?file=src%2FApp.tsx&file=src%2Fmodel%2FUserForm.ts">STACKBLITZ DEMO</a>
</h2>

## Installation

1. Install library dependency

```
npm install react-decorate-form
```

2. Allow experimental decorators configuration in your `tsconfig.json`. This removes IDE errors which could pop-up :zap:
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    /* ... */
  }
}
```

3. Add babel configuration to your `tsconfig.json`. This allows for type-safety checking :star:

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

## Contribution

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
