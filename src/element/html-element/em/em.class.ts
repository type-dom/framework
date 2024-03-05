import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeEm } from '../../../type-element/type-html/em/em.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Em';
  }
}
