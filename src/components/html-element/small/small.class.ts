import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSmall } from '../../../core/type-html/small/small.abstract';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Small';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
