import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDel } from '../../../type-element/type-html/del/del.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Del';
  }
}
