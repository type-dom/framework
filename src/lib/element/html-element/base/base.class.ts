import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeBase } from '../../../type-element/type-html/base/base.abstract';
import type { IBase } from './base.interface';

export class Base extends TypeBase implements IBase {
  className: 'Base';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Base';
    this.setConfig(config);
  }
}
