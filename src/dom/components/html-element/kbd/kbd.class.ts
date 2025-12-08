import { TypeKbd } from '../../../../core/components/type-html/kbd/kbd.abstract';
import { KbdProps } from '../../../../core/components/type-html/kbd/kbd.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  override isBasic = true;

  constructor(params: KbdProps = {}) {
    super(params);
    this.className = 'Kbd';
    transformSlot(this, params.slot);
  }
}
