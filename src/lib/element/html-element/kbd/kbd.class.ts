import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeKbd } from '../../../type-element/type-html/kbd/kbd.abstract';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Kbd';
    this.setConfig(config);
  }
}
