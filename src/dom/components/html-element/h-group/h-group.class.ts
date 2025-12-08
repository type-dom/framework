import { TypeHGroup } from '../../../../core/components/type-html/hgroup/hgroup.abstract';
import { HGroupProps } from '../../../../core/components/type-html/hgroup/hgroup.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  override isBasic = true;

  constructor(params: HGroupProps = {}) {
    super(params);
    this.className = 'HGroup';
    transformSlot(this, params.slot);
  }
}
