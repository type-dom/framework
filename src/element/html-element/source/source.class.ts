import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSource } from '../../../type-element/type-html/source/source.abstract';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Source';
  }
}
