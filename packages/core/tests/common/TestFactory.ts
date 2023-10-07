import Types from "../../src/utilities/impl/Types";
import ValidationEngine from "../../src/validation";
import ValidationHandlerMock, {
  IMock,
  buildIOName,
} from "./ValidationHandlerMock";

export type StandardTestProps<T> = {
  Model: Types.Class<IMock<T>>;
  type: string;
  identifier: string;
  successData: T[];
  errorData: T[];
};

export function standardTest<T>({
  Model,
  identifier,
  successData,
  errorData,
  type,
}: StandardTestProps<T>) {
  const handler = new ValidationEngine.ValidationEngine<T>(Model as any);
  const expectService = new ValidationHandlerMock(handler as any);

  describe(buildIOName(identifier, true, type), () => {
    expectService.expect(successData, true);
  });

  describe(buildIOName(identifier, false, type), () => {
    expectService.expect(errorData, false);
  });
}
