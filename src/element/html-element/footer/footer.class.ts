import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFooter } from '../../../type-element/type-html/footer/footer.abstract';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Footer';
  }
}
