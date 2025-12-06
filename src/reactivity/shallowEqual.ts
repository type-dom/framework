/**
 * 浅比较两个对象/数组是否相等
 *  属性值为 TypeNode/Signals 类型要单独处理。
 * @param obj1 - 要比较的对象/数组
 * @param obj2 - 要比较的对象/数组
 */
export  function shallowEqual(obj1: any, obj2: any): boolean {
  // 引用相同直接返回true
  if (obj1 === obj2) {
    return true;
  }

  // 类型检查 - 如果任一参数不是对象或为null，则直接比较值
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return false;
  }

  // 处理数组情况
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // 长度不同直接返回false
    if (obj1.length !== obj2.length) {
      return false;
    }
    // 逐个比较数组元素（仅第一层）
    for (let i = 0; i < obj1.length; i++) {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
    return true;
  }

  // 一个是数组一个不是数组
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    return false;
  }

  // 处理普通对象
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 属性数量不同
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 逐个比较对象属性值（仅第一层）
  for (const key of keys1) {
    if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
