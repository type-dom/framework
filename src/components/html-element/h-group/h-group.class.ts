import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeHGroup } from '../../../core/type-html/hgroup/hgroup.abstract';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'HGroup';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
