import { TypeButton } from '../../../../core/components/type-html/button/button.abstract';
import { TypeButtonProps } from '../../../../core/components/type-html/button/button.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  override isBasic = true;

  constructor(params: TypeButtonProps = {}) {
    super();
    this.className = 'Button';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
