module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.tsx"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
  reporters: ["<rootDir>/../../reporter.js"],
};
