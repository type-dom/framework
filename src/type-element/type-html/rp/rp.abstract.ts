import { TypeHtml } from '../type-html.abstract';
import type { ITypeRp } from './rp.interface';
export abstract class TypeRp extends TypeHtml implements ITypeRp {
  nodeName: 'rp';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'rp';
    this.dom = document.createElement(this.nodeName);
  }
}
