import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeCode } from '../../../core/type-html/code/code.abstract';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Code';
    this.useParams(params);
  }
}
