import { TypeDiv } from '../../type-html/div/div.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Div';
    this.setParams(params);
  }
}
