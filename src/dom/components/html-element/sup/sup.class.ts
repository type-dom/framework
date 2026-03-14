import { TypeSup } from '../../../../core/abstracts/type-html/sup/sup.abstract';
import { SupProps } from '../../../../core/abstracts/type-html/sup/sup.interface';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  constructor(params: SupProps = {}) {
    super(params);
    this.className = 'Sup';
  }
}
