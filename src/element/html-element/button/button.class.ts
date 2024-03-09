import { TypeButton } from '../../../type-element/type-html/button/button.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Button';
    this.setConfig(config);
  }
}
