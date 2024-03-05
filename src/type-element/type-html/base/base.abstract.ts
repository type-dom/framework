import { TypeHtml } from '../type-html.abstract';
import type { ITypeBase } from './base.interface';

export abstract class TypeBase extends TypeHtml implements ITypeBase {
  nodeName: 'base';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'base';
    this.dom = document.createElement(this.nodeName);
  }
}
