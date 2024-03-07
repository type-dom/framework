import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHead } from '../../../type-element/type-html/head/head.abstract';
import type { IHead } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';

  constructor(
    public parent: TypeHtml,
    nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  ) {
    super(nodeName);
    this.className = 'Head';
  }
}
