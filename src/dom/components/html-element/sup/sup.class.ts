import { TypeSup } from '../../../../core/components/type-html/sup/sup.abstract';
import { SupProps } from '../../../../core/components/type-html/sup/sup.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';
  override isBasic = true;

  constructor(params: SupProps = {}) {
    super(params);
    this.className = 'Sup';
    transformSlot(this, params.slot);
  }
}
