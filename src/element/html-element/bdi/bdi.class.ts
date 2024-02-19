import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBdi } from '../../../type-element/type-html/bdi/bdi.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IBdi } from './bdi.interface';
export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Bdi';
  }
}
