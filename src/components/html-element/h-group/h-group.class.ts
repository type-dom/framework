import { TypeHGroup } from '../../../core/type-html/hgroup/hgroup.abstract';
import { TypeHGroupProps } from '../../../core/type-html/hgroup/hgroup.interface';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  override isBasic = true;

  constructor(params: TypeHGroupProps = {}) {
    super();
    this.className = 'HGroup';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
