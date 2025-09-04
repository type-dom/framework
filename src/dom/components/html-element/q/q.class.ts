import { TypeQ } from '../../../../core/components/type-html/q/q.abstract';
import { TypeQProps } from '../../../../core/components/type-html/q/q.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IQ } from './q.interface';

export class Q extends TypeQ implements IQ {
  className: 'Q';

  override isBasic = true;

  constructor(params: TypeQProps = {}) {
    super();
    this.className = 'Q';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
