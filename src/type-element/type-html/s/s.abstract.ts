import { TypeHtml } from '../type-html.abstract';
import type { ITypeS } from './s.interface';
export abstract class TypeS extends TypeHtml implements ITypeS {
  nodeName: 's';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 's';
    this.dom = document.createElement(this.nodeName);
  }
}
