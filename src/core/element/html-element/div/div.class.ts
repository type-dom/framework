import { TypeDiv } from '../../../type-html/div/div.abstract';
import type { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  constructor(config?: ITypeConfig) {
    super();
    this.className = 'Div';
    this.setConfig(config);
  }
}
