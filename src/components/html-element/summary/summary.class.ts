import { TypeSummary } from '../../../core/type-html/summary/summary.abstract';
import { TypeSummaryProps } from '../../../core/type-html/summary/summary.interface';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  override isBasic = true;

  constructor(params: TypeSummaryProps = {}) {
    super();
    this.className = 'Summary';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
