import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IDiv } from './div.interface';

export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Div';
  }
}
