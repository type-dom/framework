import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSummary } from '../../../type-element/type-html/summary/summary.abstract';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Summary';
  }
}
