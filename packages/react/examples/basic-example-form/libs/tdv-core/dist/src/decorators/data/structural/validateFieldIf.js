"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldIf = void 0;
const createFieldDecorator_1 = require("../../factory/forField/createFieldDecorator");
function validateFieldIf(validateIf) {
    return (0, createFieldDecorator_1.createFieldDecorator)((meta, name) => {
        meta.getUntypedDescriptor(name).validateIf = validateIf;
    });
}
exports.validateFieldIf = validateFieldIf;
