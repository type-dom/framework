import { TypeDL } from '../../../../core/components/type-html/dl/dl.abstract';
import { TypeDLProps } from '../../../../core/components/type-html/dl/dl.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  override isBasic = true;

  constructor(params: TypeDLProps = {}) {
    super();
    this.className = 'DL';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
