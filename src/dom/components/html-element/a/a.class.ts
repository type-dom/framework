import { TypeA } from '../../../../core/components/type-html/a/a.abstract';
import { AProps } from '../../../../core/components/type-html/a/a.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';
  override isBasic = true;

  constructor(params: AProps = {}) {
    super(params);
    this.className = 'A';
    transformSlot(this, params.slot);
  }
}
