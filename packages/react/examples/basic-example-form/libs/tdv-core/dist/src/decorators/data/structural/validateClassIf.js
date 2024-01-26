"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClassIf = void 0;
const createClassDecorator_1 = require("../../factory/forClass/createClassDecorator");
function validateClassIf(validateIf) {
    return (0, createClassDecorator_1.createClassDecorator)(meta => {
        meta.validateIf = validateIf;
    });
}
exports.validateClassIf = validateClassIf;
