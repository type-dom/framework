import { TypeHtml } from '../type-html.abstract';
import type { ITypeQ } from './q.interface';
export abstract class TypeQ extends TypeHtml implements ITypeQ {
  nodeName: 'q';
  dom: HTMLQuoteElement;
  protected constructor() {
    super();
    this.nodeName = 'q';
    this.dom = document.createElement(this.nodeName);
  }
}
