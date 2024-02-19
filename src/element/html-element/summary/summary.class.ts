import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSummary } from '../../../type-element/type-html/summary/summary.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ISummary } from './summary.interface';
export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Summary';
  }
}
