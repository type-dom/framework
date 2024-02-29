import { TypeHtml } from '../type-html.abstract';
import type { ITypeRt } from './rt.interface';
export abstract class TypeRt extends TypeHtml implements ITypeRt {
  nodeName: 'rt';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'rt';
    this.dom = document.createElement(this.nodeName);
  }
}
