import { $ } from "../../types/namespace/Utility.ns";

const FontColor = {
  r: "\u001b[31m",
  g: "\u001b[32m",
  b: "\u001b[34m",
  _: "\u001b[0m",
};

function text(text: string = "", color: $.Keys<typeof FontColor> = "_") {
  return `${FontColor[color]}${text}${FontColor._}`;
}

function logTime(clazz: any, methodName: string, start: number, end: number) {
  const date = new Date().toISOString();
  const duration = (end - start).toFixed(2);
  const className = typeof clazz === "string" ? clazz : clazz.constructor.name;

  // prettier-ignore
  console.log(
      text("[", 'b')
    + text(`⏰${date}`, 'g')
    + text("]", 'b')
    + text(` ${className}::${methodName}`)
    + text(` ${duration}ms`, 'g')
  );
}

function isDevelopment() {
  // TODO: Implement for production
  // This currently just watches if the tests are running...
  return globalThis?.process.env.JEST_WORKER_ID !== undefined;
}

export default function stopwatch<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  return isDevelopment()
    ? undefined
    : function (this: This, ...args: Args): Return {
        const start = performance.now();
        const result = target.call(this, ...args);
        const end = performance.now();
        logTime(this, String(context.name), start, end);
        return result;
      };
}
