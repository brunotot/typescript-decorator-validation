import ValidationEngine from "../../src/engine";
import Types from "../../src/types/namespace/types.namespace";
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
  const handler = new ValidationEngine(Model);
  const expectService = new ValidationHandlerMock(handler);

  describe(buildIOName(identifier, true, type), () => {
    expectService.expect(successData, true);
  });

  describe(buildIOName(identifier, false, type), () => {
    expectService.expect(errorData, false);
  });
}
