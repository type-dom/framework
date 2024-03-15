import { ITypeConfig } from '../../../config.interface';
import { TypeBdo } from '../../../type-element/type-html/bdo/bdo.abstract';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Bdo';
    this.setConfig(config);
  }
}
