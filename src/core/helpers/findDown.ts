/**
 * 找到下级指定 键名/键值 的第一个节点
 * 会递归遍历子节点
 * 在节点的子节点中查找符合指定属性路径和值的节点。
 * @param expr
 * @param expr 属性路径字符串，如 'a.b.c' 表示用于评估的表达式，可以是嵌套属性的路径（用点分隔）
 *                       如： className    index   router.path
 * @param value 要匹配的值 如：TdIcon        1       /home
 * @param node 当前节点对象
 * @returns 匹配到的子节点或undefined
 */
import { getCurrentInstance } from '../component';
import { TypeNode } from '../type-node/type-node.abstract';

export function findDown<T extends TypeNode>(expr: string, value: any, node = getCurrentInstance()): T | undefined {
  // console.log('down expr is ', expr, ' value is ', value);
  if (!node) return undefined;
  if (value === undefined) {
    return undefined;
  }

  // 将属性路径拆分为数组，用于逐层访问对象属性
  const path = expr.split('.');
  // 遍历当前节点的所有子节点进行查找
  for (const child of node.children) {
    // 尝试从子节点本身开始逐层访问属性值
    // 如果属性路径访问过程中出现null/undefined，返回undefined
    let propValue = path.reduce((acc: any, curr: string) => {
      // 如果当前累积值为 null 或 undefined，则返回 undefined
      if (!acc) {
        return undefined;
      }
      // 返回下一层的对象或属性值
      return acc[curr];
    }, child);

    // 如果第一次访问失败，尝试从子节点的props属性开始访问
    if (!propValue) {
      propValue = path.reduce((acc: any, curr: string) => {
        // 如果当前累积值为 null 或 undefined，则返回 undefined
        if (!acc) {
          return undefined;
        }
        // 返回下一层的对象或属性值
        return acc[curr];
      }, child.$options);
    }

    // 如果属性值匹配目标值，返回当前子节点
    if (propValue === value) {
      return child as T;
    } else if (child.children.length > 0) { // 如果子节点有子节点，递归向下查找
      const res = findDown(expr, value, child);
      if (res) { // 有值才返回，否则继续遍历
        return res as T;
      }
    }
  }
  // 遍历完所有子节点未找到匹配项，返回undefined
  return undefined;
}

export function find<T extends TypeNode>(expr: string, value: any, node = getCurrentInstance()): T | undefined {
  // console.log('find expr is ', expr, ' value is ', value);
  if (!node) return undefined;
  if (value === undefined) {
    return undefined;
  }

  // 将属性路径拆分为数组，用于逐层访问对象属性
  const path = expr.split('.');
  // 遍历当前节点的所有子节点进行查找
  for (const child of node.children) {
    // 尝试从子节点本身开始逐层访问属性值
    // 如果属性路径访问过程中出现null/undefined，返回undefined
    let propValue = path.reduce((acc: any, curr: string) => {
      // 如果当前累积值为 null 或 undefined，则返回 undefined
      if (!acc) {
        return undefined;
      }
      // 返回下一层的对象或属性值
      return acc[curr];
    }, child);

    // 如果第一次访问失败，尝试从子节点的props属性开始访问
    if (!propValue) {
      propValue = path.reduce((acc: any, curr: string) => {
        // 如果当前累积值为 null 或 undefined，则返回 undefined
        if (!acc) {
          return undefined;
        }
        // 返回下一层的对象或属性值
        return acc[curr];
      }, child.$options);
    }

    // 如果属性值匹配目标值，返回当前子节点
    if (propValue === value) {
      return child as T;
    } else if (child.children.length > 0) { // 如果子节点有子节点，递归向下查找
      const res = findDown(expr, value, child);
      if (res) { // 有值才返回，否则继续遍历
        return res as T;
      }
    }
  }
  // 遍历完所有子节点未找到匹配项，返回undefined
  return undefined;
}

export function findAll<T extends TypeNode>(expr: string, value: any, node = getCurrentInstance(), results: T[] = []): T[] {
  // console.log('down expr is ', expr, ' value is ', value);
  if (!node) return results;
  if (value === undefined) {
    return results;
  }

  // 将属性路径拆分为数组，用于逐层访问对象属性
  const path = expr.split('.');
  // 遍历当前节点的所有子节点进行查找
  for (const child of node.children) {
    // 尝试从子节点本身开始逐层访问属性值
    // 如果属性路径访问过程中出现null/undefined，返回undefined
    let propValue = path.reduce((acc: any, curr: string) => {
      // 如果当前累积值为 null 或 undefined，则返回 undefined
      if (!acc) {
        return undefined;
      }
      // 返回下一层的对象或属性值
      return acc[curr];
    }, child);

    // 如果第一次访问失败，尝试从子节点的props属性开始访问
    if (!propValue) {
      propValue = path.reduce((acc: any, curr: string) => {
        // 如果当前累积值为 null 或 undefined，则返回 undefined
        if (!acc) {
          return undefined;
        }
        // 返回下一层的对象或属性值
        return acc[curr];
      }, child.$options);
    }

    // 如果属性值匹配目标值，返回当前子节点
    if (propValue === value) {
      results.push(child as T);
    } else if (child.children.length > 0) { // 如果子节点有子节点，递归向下查找
      // const res = findAll(expr, value, child);
      // if (res) { // 有值才返回，否则继续遍历
      //   results.push(res as T);
      // }
      findAll(expr, value, child, results)
    }
  }
  console.log('results is ', results)
  // 遍历完所有子节点未找到匹配项，返回undefined
  return results;
}
