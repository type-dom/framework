import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSource } from '../../../type-element/type-html/source/source.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ISource } from './source.interface';
export class Source extends TypeSource implements ISource {
  className: 'Source';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Source';
  }
}
