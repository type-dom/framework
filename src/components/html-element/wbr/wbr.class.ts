import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeWbr } from '../../../core/type-html/wbr/wbr.abstract';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Wbr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
