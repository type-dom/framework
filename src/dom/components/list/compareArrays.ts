import { TypeNode } from '../../../core/type-node/type-node.abstract';

type ListItem = string | number | TypeNode;

/**
 * 比较两个元素是否相等
 * @param a 第一个元素
 * @param b 第二个元素
 * @returns 是否相等
 */
function isEqual(a: ListItem, b: ListItem): boolean {
  // 类型不同直接返回false
  if (typeof a !== typeof b) return false;

  // 处理基本类型
  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return a === b;
  }

  // 处理TypeNode类型 - 比较引用或特定属性
  if (a instanceof TypeNode && b instanceof TypeNode) {
    // 可以根据实际需求修改比较逻辑
    // 例如比较uid或其他唯一标识符
    return a === b || a.uid === b.uid;
  }

  // 其他情况使用严格相等比较
  return a === b;
}

/**
 * 比较两个混合类型数组的差异
 * @param oldArray 旧数组
 * @param newArray 新数组
 * @returns 差异结果
 */
export function compareMixedArrays(
  oldArray: ListItem[],
  newArray: ListItem[]
): {
  added: { item: ListItem, index: number }[];
  removed: { item: ListItem, index: number }[];
  modified: { oldItem: ListItem, newItem: ListItem, index: number }[];
  unchanged: { item: ListItem, index: number }[];
} {
  const result = {
    added: [] as { item: ListItem, index: number }[],
    removed: [] as { item: ListItem, index: number }[],
    modified: [] as { oldItem: ListItem, newItem: ListItem, index: number }[],
    unchanged: [] as { item: ListItem, index: number }[]
  };

  const maxLength = Math.max(oldArray.length, newArray.length);

  for (let i = 0; i < maxLength; i++) {
    const oldItem = oldArray[i];
    const newItem = newArray[i];

    if (oldItem === undefined && newItem !== undefined) {
      // 新增元素
      result.added.push({ item: newItem, index: i });
    } else if (oldItem !== undefined && newItem === undefined) {
      // 删除元素
      result.removed.push({ item: oldItem, index: i });
    } else if (oldItem !== undefined && newItem !== undefined) {
      // console.warn('compareMixedArrays then compare newItem and oldItem', oldItem);
      // 两个位置都有元素，比较是否相等
      if (isEqual(oldItem, newItem)) {
        result.unchanged.push({ item: oldItem, index: i });
      } else {
        // console.warn('oldItem not equal newItem');
        result.modified.push({ oldItem, newItem, index: i });
      }
    }
  }

  return result;
}
