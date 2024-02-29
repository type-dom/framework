/**
 * RootNode是一个元素根节点类
 * 作为前端项目的入口文件要继承根节点类，并挂载到对应的 ID 上。
 */
import { TypeHtml } from '../type-element/type-html/type-html.abstract';
import type { IRootNode, IRootNodeConfig } from './root-node.interface';
/**
 * el 元素对象或ID；
 * parent 只有自己 TypeRoot
 */
export class RootNode extends TypeHtml implements IRootNode {
  className: 'RootNode';
  nodeName: string;
  dom: HTMLElement;
  // el?: HTMLElement;
  protected constructor(option = {} as IRootNodeConfig) {
    super();
    this.className = 'RootNode';
    // this.parent = this;
    this.nodeName = option.nodeName || 'div';
    this.dom = document.createElement(this.nodeName);
  }
  mount(el: string | HTMLElement | ShadowRoot) {
    if (el instanceof HTMLElement || el instanceof ShadowRoot) {
      el.appendChild(this.dom);
    } else {
      const appEl = document.querySelector<HTMLElement>(el);
      if (appEl) {
        appEl.appendChild(this.dom);
      } else {
        throw Error('Can not find id . ');
      }
    }
    return this;
  }
}
