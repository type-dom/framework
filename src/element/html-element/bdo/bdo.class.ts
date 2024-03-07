import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBdo } from '../../../type-element/type-html/bdo/bdo.abstract';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Bdo';
  }
}
