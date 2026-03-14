/**
 * 深度比较两个对象（含数组）是否相等
 *  todo TypeNode/Signals 要单独处理
 * @param obj1
 * @param obj2
 * @param maxDepth
 */
export function deepEqual(obj1: any, obj2: any, maxDepth = Infinity): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (maxDepth < 0 || typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }

  // 处理数组情况
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i], maxDepth - 1)) {
        return false;
      }
    }
    return true;
  }

  // 一个是数组一个不是
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    return false;
  }

  // 处理普通对象
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (!deepEqual(obj1[key], obj2[key], maxDepth - 1)) {
      return false;
    }
  }

  return true;
}
