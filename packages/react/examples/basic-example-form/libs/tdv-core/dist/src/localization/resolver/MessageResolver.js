"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMessageParser = exports.getMessageParser = void 0;
const DEFAULT_MESSAGE_PARSER = (_, message) => String(message);
const messageParser = DEFAULT_MESSAGE_PARSER;
/** Returns the current global {@link MessageParser `MessageParser`} value. */
function getMessageParser() {
    return messageParser;
}
exports.getMessageParser = getMessageParser;
/** Sets the global {@link MessageParser `MessageParser`} to the specified value (pass `undefined` to revert to default). */
function setMessageParser(messageParser) {
    messageParser = messageParser !== null && messageParser !== void 0 ? messageParser : DEFAULT_MESSAGE_PARSER;
}
exports.setMessageParser = setMessageParser;
