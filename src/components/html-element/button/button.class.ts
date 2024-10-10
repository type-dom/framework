import { TypeButton } from '../../../core/type-html/button/button.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Button';
    this.useParams(params);
  }
}
