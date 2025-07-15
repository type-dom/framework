/**
 * 组装属性
 * 根据提供的配置参数构建属性
 * @param config
 */
import { TypeNode } from './type-node.abstract';
import { TypeProps } from './type-node.interface';
import { convertEventName, isEventKey } from '../../shared';
import { AnyFn } from '@type-dom/utils';

export function useAssignProps<T extends TypeProps>(element: TypeNode, props = {} as T): T {
  if (!element.props) {
    // todo override props is undefined
    // console.error('element.props is undefined . ');
    element.props = element.baseProps;
    // console.error('element.props is undefined . ');
  }
  for (const key in props) {
    // styleObj, attrObj, events 要单独处理
    // todo 如果是fragment，要判断是否有子节点，
    //    只有一个子节点，styleObj就加到子节点上,
    //    如果是多个子节点，要怎么处理？？？？
    if (key === 'styleObj') {
      element.style?.addObj(props.styleObj);
    } else if (key === 'attrObj') {
      element.attr?.addObj(props.attrObj);
    } else if (isEventKey(key)) {
      if (element.isBasic) {
        // console.warn('element isBasic . event key is ', key);
        element.on(convertEventName(key), props[key] as AnyFn);
      } else {
        // console.warn('element is component . event key is ', key);
        element.on(convertEventName(key), props[key] as AnyFn, 'emit');
      }
    }
    //
    // if (key === 'visible' && config[key] === null) {
    //   console.warn('key is visible . value is null')
    // }
    (element.props as T)[key] = props[key];
  }
  return element.props as T;
}
