module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  transformIgnorePatterns: ["./node_modules/", "./dist/"],
};
