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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyData = void 0;
const Strategies = __importStar(require("../service/impl"));
/**
 * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
 * @remarks This object provides a way to look up the `ValidationStrategy` class that should be used for a given reflection strategy type.
 */
exports.StrategyData = {
    unknown: (() => { }),
    [Strategies.PrimitiveStrategy.Name]: Strategies.PrimitiveStrategy.StrategyResolver,
    [Strategies.ObjectStrategy.Name]: Strategies.ObjectStrategy.StrategyResolver,
    [Strategies.PrimitiveArrayStrategy.Name]: Strategies.PrimitiveArrayStrategy.StrategyResolver,
    [Strategies.ObjectArrayStrategy.Name]: Strategies.ObjectArrayStrategy.StrategyResolver,
    [Strategies.PrimitiveGetterStrategy.Name]: Strategies.PrimitiveGetterStrategy.StrategyResolver,
    [Strategies.ObjectGetterStrategy.Name]: Strategies.ObjectGetterStrategy.StrategyResolver,
    [Strategies.PrimitiveArrayGetterStrategy.Name]: Strategies.PrimitiveArrayGetterStrategy.StrategyResolver,
    [Strategies.ObjectArrayGetterStrategy.Name]: Strategies.ObjectArrayGetterStrategy.StrategyResolver,
    [Strategies.FunctionStrategy.Name]: Strategies.FunctionStrategy.StrategyResolver,
};
