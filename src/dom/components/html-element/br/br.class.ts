import { TypeBr } from '../../../../core/components/type-html/br/br.abstract';
import { BrProps } from '../../../../core/components/type-html/br/br.interface';
import { IBr } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';

  override isBasic = true;

  constructor(params: BrProps = {}) {
    super(params);
    this.className = 'Br';
  }
}
