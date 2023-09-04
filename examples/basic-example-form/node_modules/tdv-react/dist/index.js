"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = exports.useValidation = exports.useForm = exports.setLocale = exports.Rule = exports.FormProvider = exports.EntityProcessor = void 0;
const useValidation_1 = __importDefault(require("./src/hooks/useValidation"));
exports.useValidation = useValidation_1.default;
const tdv_core_1 = require("tdv-core");
Object.defineProperty(exports, "EntityProcessor", { enumerable: true, get: function () { return tdv_core_1.EntityProcessor; } });
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return tdv_core_1.Rule; } });
Object.defineProperty(exports, "setLocale", { enumerable: true, get: function () { return tdv_core_1.setLocale; } });
Object.defineProperty(exports, "validators", { enumerable: true, get: function () { return tdv_core_1.validators; } });
const FormContext_1 = __importDefault(require("./src/contexts/FormContext"));
exports.FormProvider = FormContext_1.default;
const useForm_1 = __importDefault(require("./src/hooks/useForm"));
exports.useForm = useForm_1.default;
