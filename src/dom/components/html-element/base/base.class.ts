import { TypeBase } from '../../../../core/components/type-html/base/base.abstract';
import { TypeBaseProps } from '../../../../core/components/type-html/base/base.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IBase } from './base.interface';

export class Base extends TypeBase implements IBase {
  className: 'Base';

  override isBasic = true;

  constructor(params: TypeBaseProps = {}) {
    super();
    this.className = 'Base';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
