import { TypeHtml } from '../type-html.abstract';
import type { ITypeMark } from './mark.interface';

export abstract class TypeMark extends TypeHtml implements ITypeMark {
  nodeName: 'mark';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'mark';
    this.dom = document.createElement(this.nodeName);
  }
}
