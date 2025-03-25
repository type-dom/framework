import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSub } from '../../../core/type-html/sub/sub.abstract';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Sub';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
