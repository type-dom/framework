import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeAside } from '../../../core/type-html/aside/aside.abstract';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Aside';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
