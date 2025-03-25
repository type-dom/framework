import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeKbd } from '../../../core/type-html/kbd/kbd.abstract';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Kbd';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
