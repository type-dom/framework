import { TypeB } from '../../../../core/components/type-html/b/b.abstract';
import { TypeBProps } from '../../../../core/components/type-html/b/b.interface';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  override isBasic = true;

  constructor(params: TypeBProps = {}) {
    super();
    this.className = 'B';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
