module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
  reporters: ["<rootDir>/../../reporter.js"],
};
