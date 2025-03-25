import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeStrong } from '../../../core/type-html/strong/strong.abstract';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Strong';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
