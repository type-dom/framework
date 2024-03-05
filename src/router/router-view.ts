import { TypeElement } from '../type-element/type-element.abstract';
import type { ITypeElement } from '../type-element/type-element.interface';
import { TypeHtml } from '../type-element';

/**
 * 路由视图组件
 */
export class RouterView extends TypeHtml {
  className = 'RouterView';
  parent: TypeElement;
  nodeName: string;
  // childNodes: TypeNode[];
  dom: HTMLElement;

  constructor(parent: TypeElement, option = {} as ITypeElement) {
    super();
    this.parent = parent;
    this.nodeName = option.nodeName || 'div';
    this.childNodes = [];
    this.dom = document.createElement(this.nodeName);
  }

  // render(component) {
  //   this.element.innerHTML = '';
  //   this.element.appendChild(component);
  // }
}
