import { ITypeConfig } from '../../../../core/type-node/type-node.interface';
import { TypeDD } from '../../../type-html/dl/dd/dd.abstract';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'DD';
    this.setProps(params);
  }
}
