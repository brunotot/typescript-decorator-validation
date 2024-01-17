"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = exports.Utilities = exports.Strategy = exports.Reflection = exports.Localization = exports.Decorators = exports.Form = exports.createFieldValidator = exports.createFieldDecorator = exports.createClassValidator = exports.createClassDecorator = exports.attribute = void 0;
const Decorators = __importStar(require("./src/decorators"));
exports.Decorators = Decorators;
const Localization = __importStar(require("./src/localization"));
exports.Localization = Localization;
const Reflection = __importStar(require("./src/reflection"));
exports.Reflection = Reflection;
const Strategy = __importStar(require("./src/strategy"));
exports.Strategy = Strategy;
const Utilities = __importStar(require("./src/utilities"));
exports.Utilities = Utilities;
const Validation = __importStar(require("./src/validation"));
exports.Validation = Validation;
exports.attribute = Decorators.attribute;
exports.createClassDecorator = Decorators.createClassDecorator;
exports.createClassValidator = Decorators.createClassValidator;
exports.createFieldDecorator = Decorators.createFieldDecorator;
exports.createFieldValidator = Decorators.createFieldValidator;
exports.Form = Validation.Form;
__exportStar(require("./src/overrides"), exports);
