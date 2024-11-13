export function firstToUpper(str) {
  const ret = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
  return ret;
}
export function hyphenToUpper(str) {
  const items = str.split('-');
  var ret = firstToUpper(items[0])
  if (items[1] != null) {
    ret += " " + firstToUpper(items[1]);
  }
  return ret
}
