import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBase } from '../../../type-element/type-html/base/base.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IBase } from './base.interface';
export class Base extends TypeBase implements IBase {
  className: 'Base';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Base';
  }
}
