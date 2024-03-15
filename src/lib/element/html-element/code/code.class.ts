import { ITypeConfig } from '../../../config.interface';
import { TypeCode } from '../../../type-element/type-html/code/code.abstract';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Code';
    this.setConfig(config);
  }
}
