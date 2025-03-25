import { TypeDiv } from '../../../core/type-html/div/div.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Div';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
