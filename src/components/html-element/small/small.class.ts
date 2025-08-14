import { TypeSmall } from '../../../core/type-html/small/small.abstract';
import { TypeSmallProps } from '../../../core/type-html/small/small.interface';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  override isBasic = true;

  constructor(params: TypeSmallProps = {}) {
    super();
    this.className = 'Small';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
