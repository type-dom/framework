import { TypeHtml } from '../../../type-html/type-html.abstract';
import { TypeBr } from '../../../type-html/br/br.abstract';
import { IBr, IBrConfig } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';

  constructor(config?: IBrConfig) {
    super();
    this.className = 'Br';
    this.setConfig(config);
  }
}
