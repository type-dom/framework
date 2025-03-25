import { TypeBr } from '../../../core/type-html/br/br.abstract';
import { IBr, IBrProps } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';
  override props: IBrProps;

  override isBasic = true;

  constructor(params?: IBrProps) {
    super();
    this.className = 'Br';
    this.props = this.useParams(params);
  }
}
