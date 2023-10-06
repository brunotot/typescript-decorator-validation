module.exports = {
  moduleNameMapper: {
    "^api$": "tdv-core",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
  reporters: ["<rootDir>/../../test-reporter/index.js"],
  modulePathIgnorePatterns: ["<rootDir>/examples"],
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
