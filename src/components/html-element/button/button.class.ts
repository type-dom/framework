import { TypeButton } from '../../../core/type-html/button/button.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Button';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
