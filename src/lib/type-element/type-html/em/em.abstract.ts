import { TypeHtml } from '../type-html.abstract';
import type { ITypeEm } from './em.interface';

export abstract class TypeEm extends TypeHtml implements ITypeEm {
  nodeName: 'em';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'em';
    this.dom = document.createElement(this.nodeName);
  }
}
