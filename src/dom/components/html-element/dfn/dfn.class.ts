import { TypeDfn } from '../../../../core/abstracts/type-html/dfn/dfn.abstract';
import { DfnProps } from '../../../../core/abstracts/type-html/dfn/dfn.interface';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';
  constructor(params: DfnProps = {}) {
    super(params);
    this.className = 'Dfn';
  }
}
