import type API from "api";

/**
 * A namespace which contains data related to the actual parameters the decorator services expect.
 */
namespace DecoratorProps {
  /**
   * Basic bare-bones decorator props. It contains configurations which are accessible on any decorator.
   */
  export type Base = {
    groups?: string | string[];
  };

  /**
   * Represents decorator props with a message which must be provided.
   */
  export type MessageRequired = {
    message: string;
  };

  /**
   * Represents decorator props with a message which may be provided but will default to library's translation message if not.
   */
  export type MessageOptional = {
    message?: string;
  };

  /**
   * Represents a most generic decorator config possible. If undefined, it means that decorator doesn't depend on any outside conditions.
   */
  // prettier-ignore
  export type GenericModel = undefined | ZeroArgs | MultiArgs<any, any>;

  /**
   * Represents a decorator config (including Base props) which accepts no parameters but may also be a custom message.
   */
  // prettier-ignore
  export type ZeroArgsMessageRequired = string | API.Utilities.Types.Prettify<Base & MessageRequired>;

  /**
   * Represents a decorator config (including Base props) which accepts no parameters but a custom message must be provided.
   */
  // prettier-ignore
  export type ZeroArgsMessageOptional = string | API.Utilities.Types.Prettify<Base & MessageOptional> | undefined;

  /**
   * Represents a generic model of zero args with a required message or otherwise with an optional message parameter.
   */
  // prettier-ignore
  export type ZeroArgs = ZeroArgsMessageRequired | ZeroArgsMessageOptional;

  /**
   * Represents a decorator config (including Base props) which has more than zero input params with a mandatory message.
   */
  // prettier-ignore
  export type MultiArgsMessageRequired<TProp, TKey extends string = "value"> =
    API.Utilities.Types.Prettify<Base & MessageRequired & { [K in TKey]: TProp }>;

  /**
   * Represents a decorator config (including Base props) which has more than zero input params with an optional message.
   */
  // prettier-ignore
  export type MultiArgsMessageOptional<TProp, TKey extends string = "value"> =
    | TProp
    | (API.Utilities.Types.Prettify<Base & MessageOptional & { [K in TKey]: TProp }>);

  /**
   * Represents a generic model of multiple args with a required message or otherwise with an optional message parameter.
   */
  // prettier-ignore
  export type MultiArgs<TProp, TKey extends string = "value"> =
    | TProp
    | (API.Utilities.Types.Prettify<Base & (MessageOptional | MessageRequired) & { [K in TKey]: TProp }>);
}

export default DecoratorProps;
