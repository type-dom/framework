import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSup } from '../../../core/type-html/sup/sup.abstract';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Sup';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
