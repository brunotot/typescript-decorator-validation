import API from "api";

namespace DecoratorProps {
  export interface Base {
    groups?: string | string[];
  }

  export interface MessageRequired {
    message: string;
  }

  export interface MessageOptional {
    message?: string;
  }

  // prettier-ignore
  export type GenericModel = undefined | ZeroArgs | MultiArgs<any, any>;

  // prettier-ignore
  export type ZeroArgsMessageRequired = string | API.Utilities.Types.Prettify<Base & MessageRequired>;

  // prettier-ignore
  export type ZeroArgsMessageOptional = string | API.Utilities.Types.Prettify<Base & MessageOptional> | undefined;

  // prettier-ignore
  export type ZeroArgs = ZeroArgsMessageRequired | ZeroArgsMessageOptional;

  // prettier-ignore
  export type MultiArgsMessageRequired<TProp, TKey extends string = "value"> = 
    API.Utilities.Types.Prettify<Base & MessageRequired & { [K in TKey]: TProp }>;

  // prettier-ignore
  export type MultiArgsMessageOptional<TProp, TKey extends string = "value"> = 
    | TProp 
    | (API.Utilities.Types.Prettify<Base & MessageOptional & { [K in TKey]: TProp }>);

  // prettier-ignore
  export type MultiArgs<TProp, TKey extends string = "value"> = 
    | TProp 
    | (API.Utilities.Types.Prettify<Base & (MessageOptional | MessageRequired) & { [K in TKey]: TProp }>);
}

export default DecoratorProps;
