// @ts-nocheck
import { ValidationHandler } from "../..";
import "../../src/global.d.ts";

export class IMock<T> {
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
      });
    });
  }
}
