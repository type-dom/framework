/**
 * 组装属性
 * 根据提供的配置参数构建属性
 */
// import { isEventKey, } from '@type-dom/utils';
// import { isRef } from '../../reactivity';
import { isArray } from 'lodash-es';
// import { isArray } from '@type-dom/utils';
import { unref } from '../../reactivity';
import { addStyleObj } from '../../dom/modules/style/style';
import { addAttrObj } from '../../dom/modules/attribute/attribute';
import { TypeProps } from '../abstracts/type-node/type-node.interface';
import { TypeNode } from '../abstracts';
import { Attributes } from '../../dom';

export function defaultProps<Props extends TypeProps>(node: TypeNode<Props>, defaults = {} as Props) {
  try {
    const params = node.params;
    const props = node.props;
    const attrObj = unref(node.attrObj) as Attributes;
    for (const key in defaults) {
      // class styleObj, attrObj, events 要单独处理
      if (key === 'class') { // class 是会透传的
        // addAttrClass(node, defaults.class);
        // addAttrClass(node, props.class);
        if (isArray(attrObj?.class)) {
          if (isArray(defaults.class)) {
            attrObj!.class.unshift(...defaults.class);
          } else {
            attrObj!.class.unshift(defaults.class);
          }
        } else {
          if (node.attrObj === undefined) {
            node.attrObj = {};
          }
          if (isArray(defaults.class)) {
            attrObj!.class = [...defaults.class, attrObj?.class ];
          } else {
            attrObj!.class = [defaults.class, attrObj?.class, ];
          }
        }
      } else if(key === 'attrObj') {
        addAttrObj(node, defaults.attrObj); // todo defaults.attrObj要放在前面；
      } else if (key === 'styleObj') { // todo style 也要合并
        addStyleObj(node, defaults.styleObj); // todo defaults.styleObj要放在前面；
        // for (const styleKey in defaults.styleObj) {
        //   if (!(styleKey in (node.styleObj ?? {}))) {
        //     (node.styleObj as any)[styleKey] = (defaults.styleObj as any)[styleKey];
        //   }
        // }
      }
      // 只有当 key 不在 params 中时才使用默认值
      if (!(key in params)) {
        // if (key === 'class' || key === 'styleObj') {
        // //
        // } else {
          props[key] = defaults[key];
        // }
      }
    }
  } catch (e) {
    console.error('defaultProps error . ', e);
  }
}
