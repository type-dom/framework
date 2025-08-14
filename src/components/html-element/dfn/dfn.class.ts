import { TypeDfn } from '../../../core/type-html/dfn/dfn.abstract';
import { TypeDfnProps } from '../../../core/type-html/dfn/dfn.interface';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  override isBasic = true;

  constructor(params: TypeDfnProps = {}) {
    super();
    this.className = 'Dfn';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
