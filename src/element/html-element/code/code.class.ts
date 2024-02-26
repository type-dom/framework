import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeCode } from '../../../type-element/type-html/code/code.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ICode } from './code.interface';
export class Code extends TypeCode implements ICode {
  className: 'Code';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Code';
  }
}
