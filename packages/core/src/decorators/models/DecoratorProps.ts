import type API from "api";

/** A namespace which contains data related to the actual parameters the decorator services expect. */
namespace DecoratorProps {
  type MessageStrategy = "no-message" | "message-optional" | "message-required";

  type MessageOptional = { message?: string };

  type MessageRequired = { message: string };

  type MessageProps<T extends MessageStrategy> = T extends "no-message"
    ? {}
    : T extends "message-optional"
    ? MessageOptional
    : MessageRequired;

  type BaseProps = {
    groups?: string | string[];
  };

  export type Base<T extends MessageStrategy = "no-message"> =
    API.Utilities.Types.Prettify<BaseProps & MessageProps<T>>;

  export type Any =
    | Base<"no-message">
    | Base<"message-optional">
    | Base<"message-required">;
}

export default DecoratorProps;
