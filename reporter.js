const { DefaultReporter } = require("@jest/reporters");
const { AggregatedResult, TestResult } = require("@jest/test-result");

function logTestFailureDetails(test_result) {
  if (test_result.status !== "failed") return;
  console.log("Failed test:", test_result.fullName);
  for (const err of test_result.failureDetails) {
    // err will have the properties, like `_custom` and `_stuff`.
    console.log(err.matcherResult.message);
  }
}

class Reporter extends DefaultReporter {
  errorIndex = 0;

  constructor() {
    super(...arguments);
  }

  onRunStart(aggregatedResults, options) {
    super.onRunStart(...arguments);
  }

  onTestStart(test) {
    super.onTestStart(...arguments);
  }

  onTestCaseResult(test, testCaseResult) {
    super.onTestCaseResult(...arguments);
  }

  onRunComplete() {
    super.onRunComplete(...arguments);
  }

  onTestResult(test, testResult, aggregatedResults) {
    super.onTestResult(...arguments);
  }

  testFinished(config, testResult, aggregatedResults) {
    super.testFinished(...arguments);
  }

  #getMatchingIndex(string, regex, iteration) {
    let middleMatch;
    let matchingIndex = -1;
    let counter = 0;
    while ((middleMatch = regex.exec(string)) !== null) {
      counter++;
      const index = middleMatch.index;
      if (counter === iteration) {
        matchingIndex = index;
        break;
      }
    }
    return matchingIndex;
  }

  /** @param {TestResult} result */
  printTestFileHeader(_testPath, _config, _result) {
    // NOOP
  }

  /** @param {TestResult} result */
  printTestFileFailureMessage(_testPath, _config, result) {
    if (!result.testResults.some((t) => t.status === "failed")) {
      super.printTestFileFailureMessage(_testPath, _config, result);
      return;
    }

    const fp = result.testFilePath;
    const relativePath = fp.substring(fp.indexOf("tests/"));
    const indexOfLastSlash = relativePath.lastIndexOf("/");
    const restLeft = relativePath.substring(0, indexOfLastSlash);
    const restRight = relativePath.substring(indexOfLastSlash);
    const relativePathColored = `\u001b[30m${restLeft}\u001b[37;1m${restRight}\u001b[31;1m`;
    const failBadgeMsg = `\u001b[43m FAIL \u001b[0m`;

    const string = result.testResults
      .map((tr) => {
        if (tr.status !== "failed") {
          return "";
        }

        const message = tr.failureMessages.join("");
        this.errorIndex++;

        return (
          `${failBadgeMsg} ${relativePathColored}\n  [${this.errorIndex}] ` +
          message.substring(0, this.#getMatchingIndex(message, / +at/g, 2))
        );
      })
      .filter((o) => !!o)
      .join(
        "---------------------------------------------------------------  \n  "
      );
    result.failureMessage = `  ${string}`;
    super.printTestFileFailureMessage(_testPath, _config, result);
  }

  log(message) {
    //console.log("LOLACH");
    process.stderr.write(`${message}\n`);
  }

  // After each test
  /*onTestCaseResult(test, test_result, aggregate_result) {
    console.log("MyCustomReporter onTestCaseResult:");
    logTestFailureDetails(test_result);
  }*/
}

module.exports = Reporter;
