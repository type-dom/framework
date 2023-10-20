import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFooter } from '../../../type-element/type-html/footer/footer.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IFooter } from './footer.interface';
export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Footer';
  }
}
