import {
  addAttrClass,
  addAttrName,
  Attributes,
} from '../../dom/modules/attribute';
import { TypeProps } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { assignProps } from './assignProps';
export function useParams<Props extends TypeProps = TypeProps, A extends Attributes = Attributes>(element: TypeNode<Props, A>, params = {} as Props): Props {
  if (params?.name) {
    addAttrName(element, params.name);
  }
  if (params?.class) {
    // todo TdIcon 的 class td-icon样式会被后加载。
    addAttrClass(element, params.class);
  }
  if (params.parent) {
    element.parent = params.parent;
  }

  // if (params?.data) {
  //   element.data = reactive(params.data);
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
  // todo TdTimeline example custom-node.ts  属性是undefined的属性，应该被过滤掉的，但是目前没有过滤。
  //    这样会把默认值给重置为undefined，与设计不符。
  //    又没有场景就是给props的属性赋值 undefined ?????
  //    TdInput 会多出前后缀， 有冲突。
  // const param = removeUndefinedProps(params as any) as unknown as T;
  // console.log('param is ', param);
  // this.uid = uid++;

  // todo 默认值如何设置；先设置默认值，再 params 覆盖。
  // for (const key of Object.keys(params)) {
  //   // 如果已经配置了默认值，则使用默认值
  //   // (params as any)[key] ??= (this.$options as any)?.[key];
  // }
  // onCreated(() => { // element.isBasic 是super(params)后赋值的。 error constructor中有其它操做的。
    assignProps(element, params);
  // });
  return element.$options as unknown as Props;
}
