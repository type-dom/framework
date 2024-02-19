import { TypeHtml } from '../type-html.abstract';
import type { ITypeSpan } from './span.interface';
export abstract class TypeSpan extends TypeHtml implements ITypeSpan {
  nodeName: 'span';
  dom: HTMLSpanElement;
  protected constructor() {
    super();
    this.nodeName = 'span';
    this.dom = document.createElement(this.nodeName);
  }
}
