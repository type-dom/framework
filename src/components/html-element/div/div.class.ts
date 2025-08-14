import { TypeDiv } from '../../../core/type-html/div/div.abstract';
import { TypeDivProps } from '../../../core/type-html/div/div.interface';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  override isBasic = true;

  constructor(params: TypeDivProps = {}) {
    super();
    this.className = 'Div';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
