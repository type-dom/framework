import { TypeHGroup } from '../../../../core/abstracts/type-html/hgroup/hgroup.abstract';
import { HGroupProps } from '../../../../core/abstracts/type-html/hgroup/hgroup.interface';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';
  constructor(params: HGroupProps = {}) {
    super(params);
    this.className = 'HGroup';
  }
}
