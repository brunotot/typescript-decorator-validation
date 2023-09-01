const tsNode = require("ts-node");

tsNode.register({
  transpileOnly: true,
  compilerOptions: require("../tsconfig.json").compilerOptions,
});

module.exports = require("./test-reporter");
