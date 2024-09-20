import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeHGroup } from '../../../core/type-html/hgroup/hgroup.abstract';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'HGroup';
    this.useParams(params);
  }
}
