import { TypeHtml } from '../type-html.abstract';
import type { ITypeAddress } from './address.interface';
export abstract class TypeAddress extends TypeHtml implements ITypeAddress {
  nodeName: 'address';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'address';
    this.dom = document.createElement(this.nodeName);
  }
}
