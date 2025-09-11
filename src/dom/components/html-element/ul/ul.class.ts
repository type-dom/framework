import { TypeUL } from '../../../../core/components/type-html/ul/ul.abstract';
import { TypeULProps } from '../../../../core/components/type-html/ul/ul.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  override isBasic = true;

  constructor(params: TypeULProps = {}) {
    // console.warn('UL constructor . ');
    super();
    this.className = 'UL';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
