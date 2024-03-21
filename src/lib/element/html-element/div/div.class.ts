import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  constructor(config: Partial<ITypeConfig>) {
    super();
    this.className = 'Div';
    this.setConfig(config);
  }
}
