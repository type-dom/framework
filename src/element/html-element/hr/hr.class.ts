import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHr } from '../../../type-element/type-html/hr/hr.abstract';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Hr';
  }
}
