import { TypeHtml } from '../type-html.abstract';
import type { ITypeA } from './a.interface';
export abstract class TypeA extends TypeHtml implements ITypeA {
  nodeName: 'a';
  dom: HTMLAnchorElement;
  protected constructor() {
    super();
    this.nodeName = 'a';
    this.dom = document.createElement(this.nodeName);
  }
}
