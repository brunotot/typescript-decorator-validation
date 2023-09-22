import Helper from "./helper.namespace";

/**
 * @namespace Params
 *
 * @description
 * A collection of types related to parameters.
 */
namespace Params {
  /**
   * @type
   *
   * @description
   * An object type representing partial parameter values.
   */
  export type partial = {
    disabled: "disabled";
    enabled: "enabled";
  };

  /**
   * @type
   *
   * @description
   * A type representing the values of the `Params.partial` object type.
   */
  export type valuePartial = Helper.Values<Params.partial>;
}

/**
 * @description
 * The default export for the `Params` namespace.
 */
export default Params;
