import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeB } from '../../../type-element/type-html/b/b.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'B';
  }
}
