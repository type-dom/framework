import { LifecycleHooks, NodeName } from '../enums';
import { TextNode } from '../text-node/text-node.class';
import { TypeElement } from './type-element.abstract';
import { ElProp } from './type-element.interface';
// import { useVIf } from './useVIf';
// import { useVShow } from './useVShow';
// import { useVModel } from './useVModel';

export function useUpdate(element: TypeElement, el?: ElProp): void {
  // console.warn('then update element.className is ' + element.className);
  if (!element) {
    console.error('element does not exist . ');
    return;
  }

  // if (element.props.disabled) {
  //   return;
  // }
  // let appEl: Exclude<ElProp, string>;
  // if (
  //   element?.to // 显式验证 to 属性存在且为真值
  //   && !(
  //     element.className === 'TdTeleport'
  //     && Boolean(unref(element.props.disabled))
  //   )
  // ) {
  //   appEl = getToDom(element);
  // } else if (typeof el === 'string') {
  //   appEl = document.querySelector<HTMLElement>(el);
  // } else if (el) { // todo maybe Document, etc.
  //   appEl = el;
  // }

  element.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((cb) => cb());
  element.createDom();
  for (const child of element.children) {
    if (child instanceof TypeElement) {
      useUpdate(child);
    } else if (child instanceof TextNode) {
      // todo TextNode 如何刷新？？？
      child.update() // TextNode
    } else {
      console.warn('child is not TypeElement and TextNode, but is ', child);
    }
  }
  if (element.props.nodeName === NodeName.FRAGMENT) {
    // todo DocumentFragment 挂载到其他元素上，子节点要根据数组重新赋值。
    // for (const child of element.children) {
    //   // // fragment 的dom是DocumentFragment。
    //   // child.dom && element.dom?.appendChild(child.dom); // todo 如何处理？？？
    //   // // todo child 是 Transition时，这里的逻辑有问题
    //   // // appEl = appEl || element.parent?.elementParent?.dom;
    //   // if (unref(element.to)) {
    //   //   child.update(unref(element.to));
    //   //   // console.log('element.to is ', element.to);
    //   // } else if (appEl) {
    //   //   child.update(appEl);
    //   // } else {
    //   //   // throw Error('Can not find el . ');
    //   //   if (child.className === 'Teleport') {
    //   //     child.update();
    //   //   } else {
    //   //     child.update(element.elementParent?.dom);
    //   //   }
    //   // }
    // }
  } else {
    element.render(); // setStyleObj, setAttrObj
    // if (appEl && element.dom) {
    //   appEl.appendChild(element.dom);
    // }
    // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
    // for (const child of element.children) {
    //   // element.renderChild(child);
    //   // child.update(element.dom);
    // }
  }
  // useVIf(element);
  // useVShow(element);
  // useVModel(element);

  element.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
  // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
  // todo 应该是有变化时才需要
  // element.initEvents?.();
  // element.listenEvents();
}
