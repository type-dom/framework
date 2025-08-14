import { TypeEm } from '../../../core/type-html/em/em.abstract';
import { TypeEmProps } from '../../../core/type-html/em/em.interface';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  override isBasic = true;

  constructor(params: TypeEmProps = {}) {
    super();
    this.className = 'Em';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
