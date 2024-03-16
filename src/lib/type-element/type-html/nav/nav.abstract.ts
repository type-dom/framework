import { TypeHtml } from '../type-html.abstract';
import type { ITypeNav } from './nav.interface';

export abstract class TypeNav extends TypeHtml implements ITypeNav {
  nodeName: 'nav';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'nav';
    this.dom = document.createElement(this.nodeName);
  }
}
