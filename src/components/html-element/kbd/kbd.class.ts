import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeKbd } from '../../type-html/kbd/kbd.abstract';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Kbd';
    this.setParams(params);
  }
}
