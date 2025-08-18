import { TypeBr } from '../../../../core/components/type-html/br/br.abstract';
import { TypeBrProps } from '../../../../core/components/type-html/br/br.interface';
import { IBr } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';

  override isBasic = true;

  constructor(params: TypeBrProps = {}) {
    super();
    this.className = 'Br';
    this.useParams(params);
  }
}
