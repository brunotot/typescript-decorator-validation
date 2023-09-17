import EntityProcessor from "../../src/reflection/models/entity.processor";
import { Class } from "../../src/types/validation/Class.type";
import ValidationHandlerMock, {
  IMock,
  buildIOName,
} from "./ValidationHandlerMock";

export type StandardTestProps<T> = {
  Model: Class<IMock<T>>;
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
  const handler = new EntityProcessor(Model);
  const expectService = new ValidationHandlerMock(handler);

  describe(buildIOName(identifier, true, type), () => {
    expectService.expect(successData, true);
  });

  describe(buildIOName(identifier, false, type), () => {
    expectService.expect(errorData, false);
  });
}
