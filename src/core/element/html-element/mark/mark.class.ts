import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeMark } from '../../../type-element/type-html/mark/mark.abstract';
import type { IMark } from './mark.interface';

export class Mark extends TypeMark implements IMark {
  className: 'Mark';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Mark';
    this.setConfig(config);
  }
}
