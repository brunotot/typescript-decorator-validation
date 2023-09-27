import Decorator from "..";
import Localization from "../../localization";
import Objects from "../../types/namespace/objects.namespace";
import Validation from "../../types/namespace/validation.namespace";

namespace ParamsExtractorService {
  /**
   * Extracts a message from the provided decorator properties.
   *
   * @typeParam T - The type of the object being validated.
   *
   * @param provider - The decorator properties.
   * @param defaultMessage - The default message to return if no message is found in the provider.
   *
   * @returns The extracted message or the default message if none is found.
   */
  export function message<T extends object>(
    provider: Decorator.PartialProps<any, T> | undefined,
    defaultMessage: string,
    locale: Localization.Locale
  ): string {
    if (!provider) return defaultMessage;
    const providerType = typeof provider;
    const msgNullable = providerType ? provider : provider.message;
    const msgNonNull = msgNullable ?? "";
    return msgNonNull.length
      ? Localization.Resolver.resolve(locale, msgNonNull)
      : defaultMessage;
  }

  /**
   * Extracts validation groups from the provided decorator properties.
   *
   * @typeParam T - The type of the object being validated.
   *
   * @param provider - The decorator properties.
   *
   * @returns An array of unique validation groups.
   */
  export function groups<T extends object>(
    provider: Decorator.PartialProps<any, T>
  ): Validation.Group[] {
    return Array.isArray(provider)
      ? Objects.unique(provider)
      : typeof provider === "object"
      ? Array.isArray(provider.groups)
        ? Objects.unique(provider.groups)
        : provider.groups
        ? [provider.groups]
        : []
      : [];
  }
}

export default ParamsExtractorService;
