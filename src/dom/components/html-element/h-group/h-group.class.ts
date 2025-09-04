import { TypeHGroup } from '../../../../core/components/type-html/hgroup/hgroup.abstract';
import { TypeHGroupProps } from '../../../../core/components/type-html/hgroup/hgroup.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  override isBasic = true;

  constructor(params: TypeHGroupProps = {}) {
    super();
    this.className = 'HGroup';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
