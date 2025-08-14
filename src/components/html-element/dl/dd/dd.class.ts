import { TypeDD } from '../../../../core/type-html/dl/dd/dd.abstract';
import { TypeDDProps } from '../../../../core/type-html/dl/dd/dd.interface';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  override isBasic = true;

  constructor(params: TypeDDProps = {}) {
    super();
    this.className = 'DD';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
