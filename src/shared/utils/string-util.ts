export class StringUtil {
  static snakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static camelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  static isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
  }
}
