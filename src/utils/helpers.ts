/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

// Type checkers
export const isArray = (value: any): value is any[] => Array.isArray(value);
export const isFunction = (value: any): value is Function =>
  typeof value === "function";
export const isNumber = (value: any): value is number =>
  typeof value === "number" && !isNaN(value);
export const isObject = (
  value: any
): value is Omit<{ [key: string]: any }, "any[]" | "null"> =>
  typeof value === "object" && value !== null && !isArray(value);
export const isString = (value: any): value is string =>
  typeof value === "string";
export const isUndefined = (value: any): value is undefined =>
  value === undefined || typeof value === "undefined";
export const isNull = (value: any): value is null => value === null;
export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";
export const isTrue = (value: any): value is true => value === true;
export const isFalse = (value: any): value is false => value === false;
export const isDate = (value: any): value is Date => value instanceof Date;
export const isEmpty = (
  value?: any
): value is undefined | null | "" | never[] | "NaN" => {
  return (
    isUndefined(value) ||
    isNull(value) ||
    (isString(value) && value === "") ||
    (isNumber(value) && (value === 0 || isNaN(value))) ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && Object.keys(value).length === 0) ||
    false
  );
};
