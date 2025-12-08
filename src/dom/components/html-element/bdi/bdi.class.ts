import { TypeBdi } from '../../../../core/components/type-html/bdi/bdi.abstract';
import { BdiProps } from '../../../../core/components/type-html/bdi/bdi.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';

  override isBasic = true;

  constructor(params: BdiProps = {}) {
    super(params);
    this.className = 'Bdi';
    transformSlot(this, params.slot);
  }
}
