import { TypeWbr } from '../../../../core/components/type-html/wbr/wbr.abstract';
import { TypeWbrProps } from '../../../../core/components/type-html/wbr/wbr.interface';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  override isBasic = true;

  constructor(params: TypeWbrProps = {}) {
    super();
    this.className = 'Wbr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
