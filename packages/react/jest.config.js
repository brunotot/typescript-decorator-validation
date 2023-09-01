module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
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
