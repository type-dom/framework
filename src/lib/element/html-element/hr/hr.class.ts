import { ITypeConfig } from '../../../config.interface';
import { TypeHr } from '../../../type-element/type-html/hr/hr.abstract';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Hr';
    this.setConfig(config);
  }
}
