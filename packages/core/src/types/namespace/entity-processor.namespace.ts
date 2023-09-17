import DetailedErrors from "../validation/detailed-errors.type";
import Errors from "../validation/errors.type";
import Payload from "../validation/payload.type";
import Validation from "./validation.namespace";

namespace EntityProcessorNs {
  export type Config<TBody> = {
    defaultValue?: TBody;
    groups?: Validation.Group[];
  };

  export type Result<T> = {
    valid: boolean;
    detailedErrors: DetailedErrors<T>;
    errors: Errors<T>;
  };

  export type ValidityErrorsType =
    | Result<any>
    | Result<any>[]
    | Validation.Result[]
    | Validation.Result[][];

  export type Cache<TClass, TBody = TClass> = Result<TClass> & {
    state: Payload<TBody>;
  };

  export type CacheKey<T> = Exclude<keyof Cache<T>, "state">;
}

export default EntityProcessorNs;
