import API from "../../index";
import ClassDecoratorServiceNamespace from "./service/ClassDecoratorService";
import ClassDecoratorValidatorServiceNamespace from "./service/ClassDecoratorValidatorService";
import FieldDecoratorServiceNamespace from "./service/FieldDecoratorService";
import FieldDecoratorValidatorServiceNamespace from "./service/FieldDecoratorValidatorService";
/**
 * A collection of types and interfaces for creating and handling decorators.
 */
declare namespace Decorator {
    /**
     * Options for configuring validator decorators.
     */
    type Options = {
        /**
         * Identifier of the validator decorator.
         */
        key?: string;
        /**
         * Error message to be evaluated through a preprocessor, which can have a custom or default implementation based on library setup.
         */
        message?: string;
        /**
         * Unique list of groups for conditional validation. Validator triggers only if the form is applied on a listed group.
         */
        groups?: string[];
    };
    /**
     * A collection of services which allow for easy manipulation of field and class decorators.
     */
    namespace Service {
        export import FieldDecoratorService = FieldDecoratorServiceNamespace;
        export import ClassDecoratorService = ClassDecoratorServiceNamespace;
        export import FieldDecoratorValidatorService = FieldDecoratorValidatorServiceNamespace;
        export import ClassDecoratorValidatorService = ClassDecoratorValidatorServiceNamespace;
    }
    /**
     * Type definition for a decorator function.
     *
     * @typeParam T - The type of the value being decorated.
     */
    type Instance<T = unknown> = ((target: any, context: API.Decorator.Context<T>) => void) & {};
    /**
     * Context object passed to a decorator function
     *
     * @typeParam Accept - The type of value the context accepts.
     */
    type Context<Accept = unknown> = Readonly<{
        kind: "field" | "method" | "getter";
        static: boolean;
        private: boolean;
        name: string;
        metadata: globalThis.DecoratorMetadata;
        access: {
            get: (object: any) => Accept;
        };
    }>;
    /**
     * Supplier function for generating decorators.
     *
     * @typeParam T - The type of the value being decorated.
     */
    type Supplier<T = unknown> = ((name: string, meta: API.Reflection.Services.FieldValidatorMetaService, context: API.Decorator.Context<T>) => void) & {};
    /**
     * Extracts a message from the provided decorator properties.
     *
     * @typeParam T - The type of the object being validated.
     *
     * @param provider - The decorator properties.
     * @param message - The default message to return if no message is found in the provider.
     *
     * @returns The extracted message or the default message if none is found.
     */
    function message(options: Options | undefined, locale: API.Localization.Resolver.LocaleResolver.Locale, defaultMessage: string): string;
    /**
     * Extracts validation groups from the provided decorator properties.
     * @typeParam T - The type of the object being validated.
     * @param provider - The decorator properties.
     * @returns An array of unique validation groups.
     */
    function groups(options?: Options, defaultGroups?: string[]): string[];
    /**
     * A helper function to determine whether to use a custom or a default key for a decorator.
     * @param options - Decorator args.
     * @param defaultKey - Key of the decorator if none present in options.
     * @returns A defined decorator key or the default value.
     */
    function key(options: Options | undefined, defaultKey: string): string;
}
export default Decorator;
//# sourceMappingURL=index.d.ts.map