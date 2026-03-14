import { TypeBr } from '../../../../core/abstracts/type-html/br/br.abstract';
import { BrProps } from '../../../../core/abstracts/type-html/br/br.interface';
import { IBr } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';
  constructor(params: BrProps = {}) {
    super(params);
    this.className = 'Br';
  }
}
