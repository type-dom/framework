import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDfn } from '../../../core/type-html/dfn/dfn.abstract';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Dfn';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
