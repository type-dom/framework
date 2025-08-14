import { TypeSub } from '../../../core/type-html/sub/sub.abstract';
import { TypeSubProps } from '../../../core/type-html/sub/sub.interface';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';

  override isBasic = true;

  constructor(params: TypeSubProps = {}) {
    super();
    this.className = 'Sub';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
