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
- [Documentation](#documentation)
- [Goals and TODOs](#goals-and-todos)

## Installation

1. Install library dependency
```
npm install typescript-decorator-validation
```
2. Allow experimental decorators configuration in your `tsconfig.json`. 
   <br>This removes IDE errors which could pop-up
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    /* ... */
  }
}
```
3. Add babel configuration to your `tsconfig.json`.
   <br>This allows for type-safety checking
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
3. Clone the repository main branch
```bash
git clone https://github.com/brunotot/typescript-decorator-validation.git
```
4. Checkout a new branch
```bash
git checkout -b "[issue-number]-[issue-description]"
```
5. Commit and push changes
6. Open pull request

## Documentation

### [ValidationHandler](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L28)

| Method        | Parameters | Returns | Description |
|---------------|------------|---------|-------------|
|`constructor`  |`clazz`:&nbsp;[Class\<T>](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L5)|[ValidationHandler\<T>](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L28)|instantiates `ValidationHandler` class with the given decorated class to validate|
| `validationData`  |                   | [ValidationData\<T>](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L15) | returns calculated validation data for given class through its metadata decorators           |
| `hasErrors`       | `state`:&nbsp;Object   | `boolean`          | returns `true` if state object has errors            |
| `getErrors`       | `state`:&nbsp;Object   | [ErrorData](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L19)        | returns object error state from the calculated validation metadata for the given state object |
| `validate`        | `state`:&nbsp;Object   | [StateValidationResult](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L23) | returns object state validation result from the calculated validation metadata for the given object state |
| `buildInstance`   | `state`:&nbsp;Object   | [T](https://github.com/brunotot/typescript-decorator-validation/blob/main/src/handler/ValidationHandler.ts#L36)                | returns instantiated class `T` which is used to construct `ValidationHandler<T>` |

## Goals and TODOs

- [x] Implement strict type checking
- [x] Implement predefined decorator validators
- [ ] Write documentation  
- [ ] Implement the logic so the library can be used easily in CI tests
- [ ] Implement tests for predefined decorator validators
- Write implementation libraries for popular front-end frameworks 
	- [x] [React](https://github.com/brunotot/react-decorate-form)
	- [ ] Angular
	- [ ] Svelte
	- [ ] Vue
	- [ ] Solid
