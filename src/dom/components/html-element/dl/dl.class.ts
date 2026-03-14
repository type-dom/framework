import { TypeDL } from '../../../../core/abstracts/type-html/dl/dl.abstract';
import { DLProps } from '../../../../core/abstracts/type-html/dl/dl.interface';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';
  constructor(params: DLProps = {}) {
    super(params);
    this.className = 'DL';
  }
}
