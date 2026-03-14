/**
 * 组装属性
 * 根据提供的配置参数构建属性
 */
import { AnyFn, isDataset, isModelListener, isOn } from '@type-dom/utils';
import { addAttrClass, addAttrObj } from '../../dom/modules/attribute';
import { addStyleObj } from '../../dom/modules/style/style';
// import { patchEvent } from '../../dom/modules/events';
import { addEmits, addEvent } from '../event-emitter/event-emitter';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { TypeProps } from '../abstracts/type-node/type-node.interface';
// import { onMounted } from '../apiLifecycle';
import { isEmitListener } from '../componentEmits';

export function assignProps<Props extends TypeProps>(element: TypeNode<Props>, params = {} as Props) {
  // if (!element.props) {
  //   // todo when class  override props, then props is undefined
  //   // console.error('element.props is undefined . ');
  //   element.props = element.props;
  //   // console.error('element.props is undefined . ');
  // }
  const props = element.props;
  for (const key in params) {
    // const namespace: ElementNamespace = element.isBasic ? '' : 'x-';
    // patchProp(element.dom as Element, key, props[key], props[key], namespace, element.parent);
    // styleObj, attrObj, events 要单独处理
    //  如果是fragment，子节点需要单独接收父级的 styleObj/attrObj
    if (key === 'class') { // class 是会透传的
      addAttrClass(element, params.class);
    } else if (key === 'styleObj') {
      // console.warn('assignProps styleObj . ');
      addStyleObj(element, params.styleObj);
    } else if (key === 'attrObj') {
      // element.attr?.addObj(params.attrObj);
      addAttrObj(element, params.attrObj); // todo 弹出框error
    } else if (key === 'emits') {
      // props.emits = params['emits'];
      addEmits(element, params['emits']);
    } else if (isDataset(key)) {
      addAttrObj(element, { [key]: params[key] });
    } else if (isOn(key)) {
      const event = key[2] === ':' ? key.slice(3) : key.slice(2).toLowerCase();
      (element.eventListeners || (element.eventListeners = {}))[event] = params[key] as AnyFn | AnyFn[];
      if (!isEmitListener(element.emitsOptions, key)) {
        // patchEvent(element.dom as Element, key, null, params[key], element); // initPrams 时，dom还没有创建。
        // ignore v-model listeners
        if (!isModelListener(key)) { // onUpdate:xxx
          addEvent(element, key, params[key] as AnyFn);
        }
      }
    } else {
      //
      // if (key === 'visible' && config[key] === null) {
      //   console.warn('key is visible . value is null')
      // }
      // todo td-alert 样式不对
      // (props. as T)[key] = params[key];
    }
    // todo params.attrObj 会替换 baseProps.attrObj
    //      attribute.class this.obj = this.props.attrObj; 是有影响的。
    //      props..attrObj = params.attrObj;
    props[key] = params[key];
  }
}
