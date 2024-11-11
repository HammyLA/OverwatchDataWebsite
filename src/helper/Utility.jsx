export function firstToUpper(str) {
  const ret = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
  return ret;
}
