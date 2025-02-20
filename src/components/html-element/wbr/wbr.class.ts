import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeWbr } from '../../../core/type-html/wbr/wbr.abstract';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Wbr';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
