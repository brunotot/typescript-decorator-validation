import Helper from "./helper.namespace";

/**
 * A collection of types related to types' generic parameters.
 */
namespace Params {
  /**
   * An object type representing partial parameter values.
   */
  export type partial = {
    disabled: "disabled";
    enabled: "enabled";
  };

  /**
   * A type representing the values of the `Params.partial` object type.
   */
  export type valuePartial = Helper.Values<Params.partial>;
}

export default Params;
