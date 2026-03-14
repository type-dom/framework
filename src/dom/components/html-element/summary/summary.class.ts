import { TypeSummary } from '../../../../core/abstracts/type-html/summary/summary.abstract';
import { SummaryProps } from '../../../../core/abstracts/type-html/summary/summary.interface';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  constructor(params: SummaryProps = {}) {
    super(params);
    this.className = 'Summary';
  }
}
