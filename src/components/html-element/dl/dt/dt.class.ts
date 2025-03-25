import { TypeProps } from '../../../../core/type-node/type-node.interface';
import { TypeDT } from '../../../../core/type-html/dl/dt/dt.abstract';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'DT';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
