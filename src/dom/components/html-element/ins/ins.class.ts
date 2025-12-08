import { TypeIns } from '../../../../core/components/type-html/ins/ins.abstract';
import { InsProps } from '../../../../core/components/type-html/ins/ins.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';

  override isBasic = true;

  constructor(params: InsProps = {}) {
    super(params);
    this.className = 'Ins';
    transformSlot(this, params.slot);
  }
}
