/**
 * 组装属性
 * 根据提供的配置参数构建属性
 * @param config
 */
import { TypeNode } from './type-node.abstract';
import { TypeProps } from './type-node.interface';

export function useAssignProps<T extends TypeProps>(element: TypeNode, config = {} as T): T {
  if (!element.props) {
    // console.error('element.props is undefined . ');
    // element.props = {};
    throw Error('element.props is undefined . ');
  }
  for (const key in config) {
    // styleObj, attrObj, events 要单独处理
    // todo 如果是fragment，要判断是否有子节点，
    //    只有一个子节点，styleObj就加到子节点上,
    //    如果是多个子节点，要怎么处理？？？？
    if (key === 'styleObj') {
      element.style?.addObj(config.styleObj);
    } else if (key === 'attrObj') {
      if (config.attrObj) {
        element.attr?.addObj(config.attrObj);
      }
    } else if (key === 'events') {
      element.addEvents?.(config.events);
    } else if (key === 'emits') {
      element.addEmits?.(config.emits);
    }
    //
    // if (key === 'visible' && config[key] === null) {
    //   console.warn('key is visible . value is null')
    // }
    (element.props as T)[key] = config[key];
  }
  return element.props as T;
}
