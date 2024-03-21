import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeWbr } from '../../../type-element/type-html/wbr/wbr.abstract';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Wbr';
    this.setConfig(config);
  }
}
