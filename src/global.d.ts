import { SomeClass } from "./main";
import { PrimitiveSetAppend } from "../index";

declare module "../index" {
  interface PrimitiveSetAppend {
    values: [SomeClass];
  }
}

declare global {
  interface SymbolConstructor {
    metadata: unique symbol;
  }
}
