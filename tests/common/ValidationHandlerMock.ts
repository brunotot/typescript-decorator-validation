import { ValidationHandler } from "../..";
import "../../src/global.d.ts";

export interface IMock<T> {
  value: T;
}

export function buildIOName(key: string, valid: boolean, type: string) {
  return `${valid ? "" : "in"}valid @${key} checks for ${type} variable`;
}

export default class ValidationHandlerMock<T> {
  constructor(private handler: ValidationHandler<IMock<T>>) {}

  expect(data: T[], valid: boolean) {
    data.forEach((value) => {
      it(`should ${valid ? "" : "not "}accept: "${value}"`, () => {
        const state: any = { value };
        const res = this.handler.validate(state);
        expect(res.valid).toBe(valid);
        const cachedErrors = this.handler.getErrors(state);
        expect(res.errors === cachedErrors).toBe(true);
        const nonCachedErrors = this.handler.getErrors({} as any);
        expect(cachedErrors !== nonCachedErrors).toBe(true);
      });
    });
  }
}
