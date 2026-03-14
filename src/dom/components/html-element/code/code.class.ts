import { TypeCode } from '../../../../core/abstracts/type-html/code/code.abstract';
import { CodeProps } from '../../../../core/abstracts/type-html/code/code.interface';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';
  constructor(params: CodeProps = {}) {
    super(params);
    this.className = 'Code';
  }
}
