import { unref } from '@type-dom/signals';
import { LifecycleHooks, NodeName } from '../enums';
import { TypeElement } from './type-element.abstract';
import { ElProp } from './type-element.interface';

export function useUpdate(element: TypeElement, el?: ElProp): void {
  console.warn('then update element.className is ' + element.className);
  if (element.props.disabled) {
    return;
  }
  let appEl: Exclude<ElProp, string>;
  if (typeof el === 'string') {
    appEl = document.querySelector<HTMLElement>(el);
  } else {
    appEl = el;
  }
  // element.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
  // element.recurseSetup(); // 挂载时，递归执行setup
  element.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((cb) => cb());
  element.beforeUpdate?.();
  element.createDom();
  if (Object.hasOwnProperty.call(element.props, 'vIf')) {
    if (unref(element.props.vIf) === false) {
      // console.log('element.props.vIf === false');
      // todo transition
      // element.deleteDom?.();
      // 只要不挂载就行了。
      if (element.dom instanceof Element) {
        element.dom.remove();
        // element.dom = undefined; // dom 不会删除，只是不再挂载
      }
      // return;
    } else if (unref(element.props.vIf) === true) {
      // element.createDom?.();
      // todo 应该时插入
      //   如果自身不是Fragment, upRealElement 就是自身。
      const upEl = element.parent?.upRealElement;
      if (upEl instanceof TypeElement) {
        // upEl.insertChildDom(this, element.index); // vIf 无法保证dom插入到原来的位置的。
        // upEl.appendChild(this); // todo 这样会反复插入的。vIf本身不影响插入子元素的。只是影响 dom是否挂载
      } else {
        // appEl?.appendChild(element.dom!);
        // console.error('upEl is undefined . ');
      }
    }
  }

  if (element.props.nodeName === NodeName.FRAGMENT) {
    // todo DocumentFragment 挂载到其他元素上，子节点要根据数组重新赋值。
    for (const child of element.children) {
      // fragment 的dom是DocumentFragment。
      child.dom && element.dom?.appendChild(child.dom); // todo 如何处理？？？
      // todo child 是 Transition时，这里的逻辑有问题
      // appEl = appEl || element.parent?.elementParent?.dom;
      if (unref(element.to)) {
        child.update(unref(element.to));
        // console.log('element.to is ', element.to);
      } else if (appEl) {
        child.update(appEl);
      } else {
        // throw Error('Can not find el . ');
        if (child.className === 'Teleport') {
          child.update();
        } else {
          child.update(element.elementParent?.dom);
        }
      }
    }
  } else {
    element.render(); // setStyleObj, setAttrObj
    if (appEl && element.dom) {
      appEl.appendChild(element.dom);
    }
    // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
    for (const child of element.children) {
      // element.renderChild(child);
      child.update(element.dom);
    }
  }
  element.updated?.();
  element.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
  // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
  // todo 应该是有变化时才需要
  // element.initEvents?.();
  // element.listenEvents();
}
