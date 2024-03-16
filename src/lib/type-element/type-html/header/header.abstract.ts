import { TypeHtml } from '../type-html.abstract';
import type { ITypeHeader } from './header.interface';

export abstract class TypeHeader extends TypeHtml implements ITypeHeader {
  nodeName: 'header';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
  }
}
