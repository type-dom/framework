import { TypeUL } from '../../../../core/components/type-html/ul/ul.abstract';
import { TypeULProps } from '../../../../core/components/type-html/ul/ul.interface';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  override isBasic = true;

  constructor(params: TypeULProps = {}) {
    super();
    this.className = 'UL';

    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
