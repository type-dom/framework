import { TypeButton } from '../../../../core/components/type-html/button/button.abstract';
import { ButtonProps } from '../../../../core/components/type-html/button/button.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  override isBasic = true;

  constructor(params: ButtonProps = {}) {
    super(params);
    this.className = 'Button';
    transformSlot(this, params.slot);
  }
}
