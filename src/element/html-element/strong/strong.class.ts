import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeStrong } from '../../../type-element/type-html/strong/strong.abstract';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Strong';
  }
}
