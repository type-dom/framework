import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHr } from '../../../type-element/type-html/hr/hr.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Hr';
  }
}
