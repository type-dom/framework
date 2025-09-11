import { TypeA } from '../../../../core/components/type-html/a/a.abstract';
import { TypeAProps } from '../../../../core/components/type-html/a/a.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';
  override isBasic = true;

  constructor(params: TypeAProps = {}) {
    super(params);
    this.className = 'A';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
