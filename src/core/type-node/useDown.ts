import { TypeNode } from './type-node.abstract';
export function useDown<T extends TypeNode>(expr: string, value: any, node: T) {
  // console.log('down expr is ', expr, ' value is ', value);
  if (value === undefined) {
    return undefined;
  }
  const path = expr.split('.');
  for (const child of node.children) {
    let propValue = path.reduce((acc: any, curr: string) => {
      // 如果当前累积值为 null 或 undefined，则返回 undefined
      if (!acc) {
        return undefined;
      }
      // 返回下一层的对象或属性值
      return acc[curr];
    }, child);
    if (!propValue) {
      propValue = path.reduce((acc: any, curr: string) => {
        // 如果当前累积值为 null 或 undefined，则返回 undefined
        if (!acc) {
          return undefined;
        }
        // 返回下一层的对象或属性值
        return acc[curr];
      }, child.props);
    }
    if (propValue === value) {
      return child as T;
    } else if (child.children.length > 0) {
      const res = child.down(expr, value);
      if (res) { // 有值才返回，否则继续遍历
        return res as T;
      }
    }
  }
  return undefined;
}
