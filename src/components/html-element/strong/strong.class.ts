import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeStrong } from '../../type-html/strong/strong.abstract';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Strong';
    this.setParams(params);
  }
}
