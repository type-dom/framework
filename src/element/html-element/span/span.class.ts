import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSpan } from '../../../type-element/type-html/span/span.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { ISpan } from './span.interface';
export class Span extends TypeSpan implements ISpan {
  className: 'Span';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Span';
  }
}
