import { ITypeConfig } from '../../../../type-node/type-node.interface';
import { TypeDD } from '../../../../type-element/type-html/dl/dd/dd.abstract';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'DD';
    this.setConfig(config);
  }
}
