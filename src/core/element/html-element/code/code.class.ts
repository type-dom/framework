import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeCode } from '../../../type-html/code/code.abstract';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Code';
    this.setConfig(config);
  }
}
