module.exports = {
  moduleNameMapper: {
    "^api$": "<rootDir>/index",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
  reporters: ["<rootDir>/../../test-reporter/index.js"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
    "d.ts",
  ],
};
