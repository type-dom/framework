import { TypeKbd } from '../../../../core/components/type-html/kbd/kbd.abstract';
import { TypeKbdProps } from '../../../../core/components/type-html/kbd/kbd.interface';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  override isBasic = true;

  constructor(params: TypeKbdProps = {}) {
    super();
    this.className = 'Kbd';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
