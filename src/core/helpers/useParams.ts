import { unref } from '../../reactivity';
import { Parser } from '../../parser/parser.class';
import { addAttrClass, addAttrName } from '../../dom/modules/attribute';
import { TypeProps } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { assignProps } from './assignProps';
export function useParams<Props extends TypeProps>(element: TypeElement, params = {} as Props): Props {
  if (params?.init) {
    params.init(element);
  }
  if (params?.name) {
    addAttrName(element, params.name);
  }
  if (params?.class) { // todo TdIcon 的 class td-icon样式会被后加载。
    addAttrClass(element, params.class);
  }
  element.params = params;
  if (params.parent) {
    element.parent = params.parent;
  }
  if (params?.html) {
    const parser = new Parser();
    const xElement = parser.parseFromString(unref(params.html)!);
    element.addChild(xElement);
  }
  // if (params?.data) {
  //   // element.setDataObservable(params.data);
  //   element.data = reactive(params.data);
  //   // console.log('element.data$ is ', element.data$);
  // }
  // todo 是否要单独处理。因为 parent 链是依赖addChild的。
  // 组件库中的组件 是没有 params.childNodes 的；
  // if (params?.childNodes) {
  //   // 父元素为当前元素，子元素为params.childNodes
  //   params.childNodes.forEach((item) => {
  //     // item.parent = element; // addChild 会设置parent。
  //     element.addChild(item);
  //   });
  //   // element.childNodes = params.childNodes;
  //   // element.addChildren(...params.childNodes);
  // }
  // if (params.styleObj) {
  //   element.style.addObj(params.styleObj);
  // }
  // if (params.attrObj) {
  //   element.attr.addObj(params.attrObj);
  // }
  // if (params.events) {
  //   addEvents(element, params.events);
  // }
  assignProps(element, params);
  return element.baseProps as Props;
}
