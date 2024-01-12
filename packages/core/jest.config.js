module.exports = {
  moduleNameMapper: {
    "@decorators": "<rootDir>/src/decorators",
    "@utilities": "<rootDir>/src/utilities",
    "@localization": "<rootDir>/src/localization",
    "@strategy": "<rootDir>/src/strategy",
    "@reflection": "<rootDir>/src/reflection",
    "@validation": "<rootDir>/src/validation",
    "@decorators/*": "<rootDir>/src/decorators/*",
    "@utilities/*": "<rootDir>/src/utilities/*",
    "@localization/*": "<rootDir>/src/localization/*",
    "@strategy/*": "<rootDir>/src/strategy/*",
    "@reflection/*": "<rootDir>/src/reflection/*",
    "@validation/*": "<rootDir>/src/validation/*",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
  reporters: ["<rootDir>/../../test-reporter/index.js"],
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node", "d.ts"],
};
