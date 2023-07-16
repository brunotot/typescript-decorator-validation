import MetadataProcessor from "../../processor/MetadataProcessor";
import { Context } from "../type/Context.type";

function logTime(
  classNameOrInstance: any,
  methodName: string,
  start: number,
  end: number
) {
  console.log(
    `\u001b[34;1m[\u001b[32m⏰${new Date().toISOString()}\u001b[34;1m] \u001b[0m${
      typeof classNameOrInstance === "string"
        ? classNameOrInstance
        : classNameOrInstance.constructor.name
    }::${methodName} \u001b[32;1m${(end - start).toFixed(2)}ms\u001b[0m`
  );
}

export function time<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  if (testsRunning()) return;

  const methodName = String(context.name);
  function replacementMethod(this: This, ...args: Args): Return {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    logTime(this, methodName, start, end);
    return result;
  }
  return replacementMethod;
}

function testsRunning() {
  return globalThis?.process.env.JEST_WORKER_ID !== undefined;
}

export type Decorator<T = unknown> = (target: any, context: Context<T>) => void;

export type DecoratorSupplier<T = unknown> = (
  name: string,
  processor: MetadataProcessor,
  context: Context<T>
) => void;

export function buildDecorator<T>(
  decoration: DecoratorSupplier<T>
): Decorator<T> {
  return function (_, context) {
    const name = context.name;
    const metadataProcessor = MetadataProcessor.fromContext(context);
    decoration(name, metadataProcessor, context);
  };
}
