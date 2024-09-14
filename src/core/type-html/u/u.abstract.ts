import { TypeHtml } from '../type-html.abstract';
import type { ITypeU } from './u.interface';

export abstract class TypeU extends TypeHtml implements ITypeU {
  nodeName: 'u';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'u';
    this.dom = document.createElement(this.nodeName);
  }
}
