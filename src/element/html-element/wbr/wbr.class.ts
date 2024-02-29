import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeWbr } from '../../../type-element/type-html/wbr/wbr.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IWbr } from './wbr.interface';
export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Wbr';
  }
}
