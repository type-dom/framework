/**
 * TypeRoot是一个元素根节点抽象类
 * 作为前端项目的入口文件要继承根节点抽象类，并挂载到对应的 ID 上。
 */
import { TypeHtml } from '../type-element/type-html/type-html.abstract';
import type { ITypeRoot, ITypeRootConfig } from './type-root.interface';

/**
 * el 元素对象或ID；
 * parent 只有自己 TypeRoot
 */
export abstract class TypeRoot extends TypeHtml implements ITypeRoot {
  nodeName: string;
  dom: HTMLElement;
  override isRoot: true;
  // el?: HTMLElement;
  protected constructor(config?: Partial<ITypeRootConfig>) {
    super();
    this.isRoot = true; // 根节点
    this.nodeName = config?.nodeName || 'div';
    this.dom = document.createElement(this.nodeName);
    // if (option.el instanceof HTMLElement) {
    //   option.el.appendChild(this.dom);
    // } else {
    //   const appEl = document.querySelector<Element>(option.el);
    //   if (appEl) {
    //     appEl.appendChild(this.dom);
    //   } else {
    //     throw Error('Can not find id . ');
    //   }
    // }
    this.setConfig(config);
  }
}
