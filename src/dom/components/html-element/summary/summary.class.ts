import { TypeSummary } from '../../../../core/components/type-html/summary/summary.abstract';
import { TypeSummaryProps } from '../../../../core/components/type-html/summary/summary.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  override isBasic = true;

  constructor(params: TypeSummaryProps = {}) {
    super();
    this.className = 'Summary';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
