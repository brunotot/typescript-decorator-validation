import { DefaultReporter } from "@jest/reporters";

export default class TestReporter extends DefaultReporter {
  constructor(config) {
    super(config);
  }

  printTestFileHeader: DefaultReporter["printTestFileHeader"] = (
    _testPath,
    _config,
    result
  ) => {
    if (result.numFailingTests > 0) {
      super.printTestFileHeader(_testPath, _config, result);
    }
  };
}
