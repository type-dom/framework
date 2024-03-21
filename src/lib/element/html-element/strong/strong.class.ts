import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeStrong } from '../../../type-element/type-html/strong/strong.abstract';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Strong';
    this.setConfig(config);
  }
}
