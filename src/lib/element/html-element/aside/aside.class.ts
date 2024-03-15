import { ITypeConfig } from '../../../config.interface';
import { TypeAside } from '../../../type-element/type-html/aside/aside.abstract';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Aside';
    this.setConfig(config);
  }
}
