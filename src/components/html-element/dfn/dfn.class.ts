import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDfn } from '../../../core/type-html/dfn/dfn.abstract';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Dfn';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
