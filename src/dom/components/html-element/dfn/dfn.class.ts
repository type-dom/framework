import { TypeDfn } from '../../../../core/components/type-html/dfn/dfn.abstract';
import { DfnProps } from '../../../../core/components/type-html/dfn/dfn.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  override isBasic = true;

  constructor(params: DfnProps = {}) {
    super(params);
    this.className = 'Dfn';
    transformSlot(this, params.slot);
  }
}
