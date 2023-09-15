import EntityProcessor from "../../src/model/processor/entity.processor";
import "./../global";

export interface IMock<T> {
  value: T;
}

export function buildIOName(key: string, valid: boolean, type: string) {
  return `${valid ? "" : "in"}valid @${key} checks for ${type} variable`;
}

function buildItMessage(valid: boolean, value: any) {
  return `should ${valid ? "" : "not "}accept: ${JSON.stringify(value)}`;
}

export default class ValidationHandlerMock<T> {
  constructor(private handler: EntityProcessor<IMock<T>>) {}

  expect(data: T[], valid: boolean) {
    data.forEach((value) => {
      it(buildItMessage(valid, value), () => {
        const state: any = { value };
        const res = this.handler.validate(state);
        if (res.valid !== valid) {
          console.log("Here");
          console.log(res.detailedErrors);
          /*console.log(state);
          console.log((this.handler.schema.value as any).rules.root.contents);
          console.log(
            (this.handler.schema.value as any).rules.foreach.contents
          );*/
        }
        expect(res.valid).toBe(valid);
        const cachedErrors = this.handler.getErrors(state);
        expect(res.errors === cachedErrors).toBe(true);
        const nonCachedErrors = this.handler.getErrors({} as any);
        expect(cachedErrors !== nonCachedErrors).toBe(true);
      });
    });
  }
}
