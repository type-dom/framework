import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBdi } from '../../../type-element/type-html/bdi/bdi.abstract';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Bdi';
  }
}
