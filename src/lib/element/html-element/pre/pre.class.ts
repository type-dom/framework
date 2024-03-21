import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypePre } from '../../../type-element/type-html/pre/pre.abstract';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Pre';
    this.setConfig(config);
  }
}
