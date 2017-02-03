export class StringUtils {
  public static isEmpty(str: string): boolean {
    return StringUtils.isNull(str) || str === '';
  }

  public static isNull(obj: any, properties?: string): boolean {
    if(properties === undefined || properties === null || StringUtils.isNull(obj)) {
      return obj === undefined || obj === null;
    }
    let split: string[] = properties.split('.');
    for (let i = 0; i < split.length; i++) {
      obj = obj[split[i]];
      if(obj === undefined || obj === null) {
        return true;
      }
    }
    return false;
  }

  public static isNumeric(str: any): boolean {
    if(this.isEmpty(str)) {
      return false;
    }
    return !isNaN(str - parseFloat(str)); // From jQuery (https://github.com/jquery/jquery/blob/25d8ccd1112d75394b91071ff7eba13283aaf898/src/core.js#L223)
  }

  public static startsWith(str: string, search: string): boolean {
    if(StringUtils.isNull(str) || StringUtils.isNull(search)) {
      return false;
    }
    if(search.length > str.length) {
      return false;
    }
    return str.toLowerCase().substring(0, search.length) === search.toLowerCase();

  }

  public static search(keyword: string, ...strings: string[]): boolean {
    for (let str of strings) {
      if(str.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        return true;
      }
    }
    return false;
  }

  public static cleanIconName(icon: string): string {
    if(icon !== null && icon.indexOf(' ') > -1) {
      icon = icon.replace(/\s/g, '_');
    }
    return icon;
  }

  public static replaceBetween(str: string, replaceWith: string, start: number, end: number): string {
    return str.substring(0, start) + replaceWith + str.substring(end);
  }

  public static toCamelCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  public static toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  public static cleanLinkString(linkStr: string) {
    return linkStr ? linkStr.includes("?") ? linkStr.split("?")[0] : linkStr : linkStr;
  }

  // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript/1144249#1144249
  public static deepCompare(x, y): boolean {
    let p, leftChain = [], rightChain = [];

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if(isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if(x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if((typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if(!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if(x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if(x.constructor !== y.constructor) {
      return false;
    }

    if(x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if(leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if(y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if(typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if(y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if(typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof (x[p])) {
        case 'object':
        case 'function':

          leftChain.push(x);
          rightChain.push(y);

          if(!StringUtils.deepCompare(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if(x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }
    return true;
  }
}
