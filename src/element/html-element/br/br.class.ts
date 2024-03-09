import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBr } from '../../../type-element/type-html/br/br.abstract';
import { IBr, IBrConfig } from './br.interface';

export class Br extends TypeBr implements IBr {
  className: 'Br';
  parent?: TypeHtml;

  constructor(config?: IBrConfig) {
    super();
    this.className = 'Br';
    this.setConfig(config);
  }
}
