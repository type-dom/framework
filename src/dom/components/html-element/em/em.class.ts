import { TypeEm } from '../../../../core/components/type-html/em/em.abstract';
import { EmProps } from '../../../../core/components/type-html/em/em.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  override isBasic = true;

  constructor(params: EmProps = {}) {
    super(params);
    this.className = 'Em';
    transformSlot(this, params.slot);
  }
}
