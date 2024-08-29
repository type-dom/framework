import { TypeButton } from '../../../type-html/button/button.abstract';
import type { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Button';
    this.setConfig(config);
  }
}
