import { TypeBr } from '../../type-html/br/br.abstract';
import { IBr, IBrConfig } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';
  override props: IBrConfig;

  constructor(params?: IBrConfig) {
    super();
    this.className = 'Br';
    this.props = this.setProps(params);
  }
}
