import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSmall } from '../../../type-element/type-html/small/small.abstract';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Small';
  }
}
