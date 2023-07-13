export function time<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
) {
  const methodName = String(context.name);
  function replacementMethod(this: This, ...args: Args): Return {
    const start = performance.now();
    const result = target.call(this, ...args);
    const end = performance.now();
    console.log(
      `\u001b[34;1m[\u001b[32m⏰${new Date().toISOString()}\u001b[34;1m] \u001b[0m${
        (this as any).constructor.name
      }::${methodName} \u001b[32;1m${(end - start).toFixed(2)}ms\u001b[0m\n`
    );
    return result;
  }
  return replacementMethod;
}
