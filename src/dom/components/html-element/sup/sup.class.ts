import { TypeSup } from '../../../../core/components/type-html/sup/sup.abstract';
import { TypeSupProps } from '../../../../core/components/type-html/sup/sup.interface';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  override isBasic = true;

  constructor(params: TypeSupProps = {}) {
    super();
    this.className = 'Sup';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
