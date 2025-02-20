import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeBase } from '../../../core/type-html/base/base.abstract';
import type { IBase } from './base.interface';

export class Base extends TypeBase implements IBase {
  className: 'Base';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Base';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
