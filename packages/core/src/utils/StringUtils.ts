namespace StringUtils {
  export function convertCamelCaseToText(
    camelCase: string,
    capitalizeFirstLetter: boolean = true
  ): string {
    if (camelCase === camelCase.toUpperCase()) {
      return camelCase;
    }

    let result = camelCase
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/ (\w)/g, (str) => str.toLowerCase());

    return capitalizeFirstLetter
      ? result.replace(/^./, (str) => str.toUpperCase())
      : result;
  }
}

export default StringUtils;
