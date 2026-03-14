import { TypeButton } from '../../../../core/abstracts/type-html/button/button.abstract';
import { ButtonProps } from '../../../../core/abstracts/type-html/button/button.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  constructor(params: ButtonProps = {}) {
    super(params);
    this.className = 'Button';
  }
}
