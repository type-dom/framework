import { TypeHtml } from '../type-html/type-html.abstract';
import type { ITypeRoot, ITypeRootConfig } from './type-root.interface';

/**
 * TypeRoot是一个元素根节点抽象类
 * 作为前端项目的入口文件要继承根节点抽象类，并挂载到对应的html页面元素上。
 * 挂载使用mount方法。
 * 根节点可以挂载其他子节点，也可以挂载其他根节点。
 * 根节点挂载到页面上后，其他子节点会自动挂载到根节点上。
 * 根节点抽象类
 * isRoot: true
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
