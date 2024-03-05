import { TypeHtml } from '../type-html.abstract';
import type { ITypeCode } from './code.interface';

export abstract class TypeCode extends TypeHtml implements ITypeCode {
  nodeName: 'code';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'code';
    this.dom = document.createElement(this.nodeName);
  }
}
