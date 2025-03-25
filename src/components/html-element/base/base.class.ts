import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeBase } from '../../../core/type-html/base/base.abstract';
import type { IBase } from './base.interface';

export class Base extends TypeBase implements IBase {
  className: 'Base';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Base';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
