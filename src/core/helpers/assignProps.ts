/**
 * 组装属性
 * 根据提供的配置参数构建属性
 */
import { convertEventName, isEventKey, AnyFn, isArray } from '@type-dom/utils';
import { addAttrObj } from '../../dom/modules/attribute';
import { addStyleObj } from '../../dom/modules/style/style';
import { addEmits, on } from '../event-emitter/event-emitter';
import { TypeNode } from '../type-node/type-node.abstract';
import { TypeProps } from '../type-node/type-node.interface';
import { onMounted } from '../apiLifecycle';

export function assignProps<Props extends TypeProps>(element: TypeNode<Props>, params = {} as Props) {
  // if (!element.props) {
  //   // todo when class  override props, then props is undefined
  //   // console.error('element.props is undefined . ');
  //   element.props = element.$options;
  //   // console.error('element.props is undefined . ');
  // }
  for (const key in params) {
    // const namespace: ElementNamespace = element.isBasic ? '' : 'x-';
    // patchProp(element.dom as Element, key, props[key], props[key], namespace, element.parent);
    // styleObj, attrObj, events 要单独处理
    // todo 如果是fragment，要判断是否有子节点，
    //    只有一个子节点，styleObj就加到子节点上,
    //    如果是多个子节点，要怎么处理 ？？？？
    if (key === 'styleObj') {
      addStyleObj(element, params.styleObj);
    } else if (key === 'attrObj') {
      // element.attr?.addObj(params.attrObj);
      addAttrObj(element, params.attrObj); // todo 弹出框error
    } else if (key === 'emits') {
      element.$options.emits = params['emits'];
      addEmits(element, params['emits']);
    } else if (isEventKey(key)) {
      onMounted(() => { // 如果是onCreated,在其它生命周期中添加监听事件，则会有问题。
        if (element.isBasic) {
          // console.warn('element isBasic . event key is ', key);
          if (isArray(params[key])) {
            params[key].forEach((listener) => {
              on(element, convertEventName(key), listener as AnyFn);
            });
          } else {
            on(element, convertEventName(key), params[key] as AnyFn);
          }
        } else {
          // console.warn('element is component . event key is ', key);
          if (isArray(params[key])) {
            params[key].forEach((listener) => {
              on(element, convertEventName(key), listener as AnyFn, 'event');
            });
          } else {
            on(element, convertEventName(key), params[key] as AnyFn, 'emit');
          }
        }
      }, element);
    } else {
      //
      // if (key === 'visible' && config[key] === null) {
      //   console.warn('key is visible . value is null')
      // }
      // todo td-alert 样式不对
      // (element.$options as T)[key] = params[key];
    }
    // todo params.attrObj 会替换 baseProps.attrObj
    //      attribute.class this.obj = this.props.attrObj; 是有影响的。
    //      element.$options.attrObj = params.attrObj;
    element.$options[key] = params[key];
  }
  element.props = element.$options;
}
