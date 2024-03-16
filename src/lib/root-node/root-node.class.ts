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

  protected constructor(option = {} as IRootNodeConfig) {
    super();
    this.className = 'RootNode';
    this.nodeName = option.nodeName || 'div';
    this.dom = document.createElement(this.nodeName);
  }
}
