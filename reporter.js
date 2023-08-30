const { DefaultReporter } = require("@jest/reporters");
const { AssertionResult, TestResult } = require("@jest/test-result");

class TestFileContainerResult {
  static #errorIndex = 0;

  static #SEPARATOR_CHAR = "✨";
  static #SEPARATOR_CHAR_COUNT = 55;
  static #STACK_TRACE_LINE_LIMIT = 3;
  static #FAILURE_MESSAGE_PREFIX = `  `;
  static #FAIL_BADGE = `\u001b[43m\u001b[30;1m FAIL \u001b[0m`;
  static #SEPARATOR_BASE = `\n\n${TestFileContainerResult.#SEPARATOR_CHAR.repeat(
    TestFileContainerResult.#SEPARATOR_CHAR_COUNT
  )}\n`;
  static #SEPARATOR_COMPLETE = `${TestFileContainerResult.#SEPARATOR_BASE}\n  `;

  #localErrorIndex;
  #result;
  #filePath;
  #failureMessage;
  #descriptions;

  /** @param {TestResult} result */
  constructor(result) {
    this.#localErrorIndex = 0;
    this.#result = result;
    this.#filePath = this.#buildFilePath();
    this.#descriptions = this.#buildDescriptions(result.failureMessage);
    this.#failureMessage = this.#buildFailureMessage();
  }

  get failureMessage() {
    return this.#failureMessage;
  }

  get failBadge() {
    return TestFileContainerResult.#FAIL_BADGE;
  }

  get hasErrors() {
    return this.#result.testResults.some((t) => t.status === "failed");
  }

  get filePath() {
    return ` ${this.#filePath} `;
  }

  #buildFilePath() {
    const fp = this.#result.testFilePath;
    const relativePath = fp.substring(fp.indexOf("tests/"));
    const indexOfLastSlash = relativePath.lastIndexOf("/");
    const restLeft = relativePath.substring(0, indexOfLastSlash);
    const restRight = relativePath.substring(indexOfLastSlash);
    return `\u001b[30m${restLeft}\u001b[31;1m${restRight}\u001b[31;1m`;
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

  /** @param {AssertionResult} tr */
  #resultMapper(tr) {
    if (tr.status !== "failed") return "";
    TestFileContainerResult.#errorIndex++;
    const testDescriptionMsg =
      "\u001b[31;1m" + this.#descriptions[this.#localErrorIndex] + "\u001b[0m";
    const message = tr.failureMessages.join("");
    const badgedFilePath = `${this.failBadge} \u001b[47;1m\u001b[30m${this.filePath}\u001b[0m\n`;
    const stackTraceLimit = TestFileContainerResult.#STACK_TRACE_LINE_LIMIT + 1;
    const indexOfAt = this.#getMatchingIndex(message, / +at/g, stackTraceLimit);
    const description = message.substring(0, indexOfAt);
    const rest = `  ${testDescriptionMsg}\n  [\u001b[36;1m${
      TestFileContainerResult.#errorIndex
    }\u001b[0m] ${description}`;
    this.#localErrorIndex++;
    const res = badgedFilePath + this.#replaceExpectedAndReceived(rest);
    return res.trim();
  }

  #replaceExpectedAndReceived(str) {
    return str
      .replace(/Expected: /g, "  Expected:")
      .replace(/Received: /g, "  Received:");
  }

  #buildDescriptions(str) {
    if (!str) return [];
    const regex = /●(.*?)\n/g;
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push(match[1].trim());
    }
    return matches;
  }

  get #headerMessage() {
    return TestFileContainerResult.#errorIndex > 0
      ? ""
      : "\n\n❌ FAILURE ❌" + TestFileContainerResult.#SEPARATOR_BASE + "\n";
  }

  #buildFailureMessage() {
    return (
      this.#headerMessage +
      TestFileContainerResult.#FAILURE_MESSAGE_PREFIX +
      this.#result.testResults
        .map((tr) => this.#resultMapper(tr))
        .filter(Boolean)
        .join(TestFileContainerResult.#SEPARATOR_COMPLETE) +
      TestFileContainerResult.#SEPARATOR_BASE
    );
  }
}

class Reporter extends DefaultReporter {
  constructor(config) {
    super(config);
  }

  printTestFileHeader(_testPath, _config, _result) {
    //* NOOP - Prevents Jest from printing test file headers.
  }

  /** @param {TestResult} result */
  printTestFileFailureMessage(testPath, config, result) {
    const container = new TestFileContainerResult(result);
    container.hasErrors && (result.failureMessage = container.failureMessage);
    super.printTestFileFailureMessage(testPath, config, result);
  }
}

module.exports = Reporter;
