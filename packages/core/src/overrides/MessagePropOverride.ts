/**
 * @example
 * 1: Basic usage
 * ```ts
 * // Suppose you have a JSON holding all messages of specific locale:
 * const Messages = {
 *   key1: "Localized message 1",
 *   key2: "Localized message 2",
 *   key3: "Localized message 3",
 * }
 *
 * // You can override the default message prop type by augmenting
 * // the `MessagePropOverride` interface from `tdv-core`
 * declare module "tdv-core" {
 *   interface MessagePropOverride {
 *     // Override the default message prop type with keyof typeof Messages
 *     type: keyof typeof Messages;
 *   }
 * }
 *
 * // 1. Message prop of decorators now accept
 * // only keys of Messages instead of generic string
 * class Consumer {
 *   // "message" prop is now of type: keyof typeof Messages
 *   // and will throw a type error if the key is not found in Messages
 *   \@Decorators.Required({ message: "key1" })
 *   field!: string;
 * }
 *
 * // 2. Localization.configureParser() now requires
 * // the message prop to be of type MessagesKey
 * Localization.configureParser((locale, message) => {
 *   // message: keyof typeof Messages
 * }
 * ```
 */
export interface MessagePropOverride {}

/**
 * Represents the type of the message prop used by decorators and localization service.
 * @see {@link MessagePropOverride}
 */
export type MessageProp = MessagePropOverride extends { type: infer T } ? T : string;
