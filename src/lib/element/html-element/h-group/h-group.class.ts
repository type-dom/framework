import { ITypeConfig } from '../../../config.interface';
import { TypeHGroup } from '../../../type-element/type-html/hgroup/hgroup.abstract';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'HGroup';
    this.setConfig(config);
  }
}
