import { TypeA } from '../../type-html/a/a.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'A';
    this.setParams(params);
  }
}
