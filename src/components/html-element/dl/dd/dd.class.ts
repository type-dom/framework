import { TypeProps } from '../../../../core/type-node/type-node.interface';
import { TypeDD } from '../../../../core/type-html/dl/dd/dd.abstract';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'DD';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
