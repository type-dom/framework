import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSummary } from '../../../core/type-html/summary/summary.abstract';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Summary';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
