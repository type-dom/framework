import { ITypeConfig } from '../../../config.interface';
import { TypeIns } from '../../../type-element/type-html/ins/ins.abstract';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Ins';
    this.setConfig(config);
  }
}
